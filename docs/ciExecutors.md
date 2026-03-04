# CI/CD Executor Integration guide

This document describes the environment variables used to identify which CI/CD runner is executing your tests. When these variables are detected, the corresponding runner will automatically appear in your report.

---

## How It Works

The reporter inspects environment variables at runtime to detect the current CI/CD platform. **No configuration is needed** — simply ensure the variables below are present in your environment, and the correct runner will be shown in the report automatically.

### Supported Platforms

| Platform              | Auto-detected via                  |
| --------------------- | ---------------------------------- |
| [**GitHub Actions**](#github-actions)    | `GITHUB_RUN_ID`                    |
| [**Jenkins**](#jenkins)           | `JENKINS_HOME`                     |
| [**GitLab CI**](#gitlab-ci)         | `CI_PIPELINE_ID`                   |
| [**Bitbucket Pipelines**](#bitbucket-pipelines) | `BITBUCKET_BUILD_NUMBER`         |
| [**CircleCI**](#circleci)          | `CIRCLE_WORKFLOW_ID`               |
| [**Azure Pipelines**](#azure-pipelines)   | `BUILD_BUILDID`                    |
| [**TeamCity**](#teamcity)          | `BUILD_NUMBER` + `TEAMCITY_VERSION`|
| [**Travis CI**](#travis-ci)         | `TRAVIS_BUILD_NUMBER`              |
| [**Bamboo**](#bamboo)            | `bamboo_buildNumber`               |
| [**Local Manual Run**](#local-manual-run)     | Fallback — shown as "Local Run"    |

When none of the above variables are present, the executor is shown as **Manual Execution** in the report.

### Quick Reference — All Variables

| Platform | Required (Detection) | Optional (Enrichment) |
|---|---|---|
| GitHub Actions | `GITHUB_RUN_ID` | `GITHUB_RUN_NUMBER`, `GITHUB_SERVER_URL`, `GITHUB_REPOSITORY` |
| Jenkins | `JENKINS_HOME` | `JOB_NAME`, `BUILD_NUMBER`, `BUILD_URL` |
| GitLab CI | `CI_PIPELINE_ID` | `CI_PIPELINE_IID`, `CI_PIPELINE_URL` |
| Bitbucket | `BITBUCKET_BUILD_NUMBER` | `BITBUCKET_BUILD_URL` |
| CircleCI | `CIRCLE_WORKFLOW_ID` | `CIRCLE_BUILD_NUM`, `CIRCLE_BUILD_URL` |
| Azure Pipelines | `BUILD_BUILDID` | `BUILD_BUILDURI` |
| TeamCity | `BUILD_NUMBER` + `TEAMCITY_VERSION` | `BUILD_URL` |
| Travis CI | `TRAVIS_BUILD_NUMBER` | `TRAVIS_BUILD_WEB_URL` |
| Bamboo | `bamboo_buildNumber` | `bamboo_resultsUrl` |
---

## Supported CI/CD Platforms

### GitHub Actions

Automatically detected when running inside a GitHub Actions workflow.

| Variable | Description | Example |
|---|---|---|
| `GITHUB_RUN_ID` | Unique ID of the workflow run *(required for detection)* | `9876543210` |
| `GITHUB_RUN_NUMBER` | Sequential run number for the workflow | `42` |
| `GITHUB_SERVER_URL` | Base URL of the GitHub server | `https://github.com` |
| `GITHUB_REPOSITORY` | Owner and repository name | `my-org/my-repo` |

> These variables are set automatically by GitHub Actions. No manual setup needed.

---

### Jenkins

Detected when `JENKINS_HOME` is set in the environment.

| Variable | Description | Example |
|---|---|---|
| `JENKINS_HOME` | Jenkins home directory path *(required for detection)* | `/var/jenkins_home` |
| `JOB_NAME` | Name of the Jenkins job | `my-pipeline` |
| `BUILD_NUMBER` | Sequential build number | `101` |
| `BUILD_URL` | Full URL to the build page | `http://jenkins.example.com/job/my-pipeline/101/` |

> These variables are set automatically by Jenkins. No manual setup needed.

---

### GitLab CI

Detected when `CI_PIPELINE_ID` is set in the environment.

| Variable | Description | Example |
|---|---|---|
| `CI_PIPELINE_ID` | Unique pipeline ID *(required for detection)* | `123456789` |
| `CI_PIPELINE_IID` | Project-scoped pipeline number (used for display) | `55` |
| `CI_PIPELINE_URL` | Full URL to the pipeline | `https://gitlab.com/my-org/my-repo/-/pipelines/55` |

> These variables are set automatically by GitLab CI/CD. No manual setup needed.

---

### Bitbucket Pipelines

Detected when `BITBUCKET_BUILD_NUMBER` is set in the environment.

| Variable | Description | Example |
|---|---|---|
| `BITBUCKET_BUILD_NUMBER` | Unique build number *(required for detection)* | `77` |
| `BITBUCKET_BUILD_URL` | URL to the Bitbucket pipeline build | `https://bitbucket.org/my-org/my-repo/addon/pipelines/home#!/results/77` |

> These variables are set automatically by Bitbucket Pipelines. No manual setup needed.

---

### CircleCI

Detected when `CIRCLE_WORKFLOW_ID` is set in the environment.

| Variable | Description | Example |
|---|---|---|
| `CIRCLE_WORKFLOW_ID` | Unique workflow ID *(required for detection)* | `abc-123-def-456` |
| `CIRCLE_BUILD_NUM` | Sequential build number | `88` |
| `CIRCLE_BUILD_URL` | URL to the CircleCI build | `https://circleci.com/gh/my-org/my-repo/88` |

> These variables are set automatically by CircleCI. No manual setup needed.

---

### Azure Pipelines

Detected when `BUILD_BUILDID` is set in the environment.

| Variable | Description | Example |
|---|---|---|
| `BUILD_BUILDID` | Unique build ID *(required for detection)* | `5001` |
| `BUILD_BUILDURI` | URI to the Azure DevOps build | `vstfs:///Build/Build/5001` |

> These variables are set automatically by Azure Pipelines. No manual setup needed.

---

### TeamCity

Detected when **both** `BUILD_NUMBER` and `TEAMCITY_VERSION` are set.

| Variable | Description | Example |
|---|---|---|
| `TEAMCITY_VERSION` | TeamCity server version *(required for detection)* | `2023.11` |
| `BUILD_NUMBER` | Sequential build number *(required for detection)* | `99` |
| `BUILD_URL` | URL to the TeamCity build | `http://teamcity.example.com/build/99` |

> These variables are set automatically by TeamCity. No manual setup needed.

---

### Travis CI

Detected when `TRAVIS_BUILD_NUMBER` is set in the environment.

| Variable | Description | Example |
|---|---|---|
| `TRAVIS_BUILD_NUMBER` | Sequential build number *(required for detection)* | `123` |
| `TRAVIS_BUILD_WEB_URL` | URL to the Travis CI build | `https://travis-ci.com/my-org/my-repo/builds/123` |

> These variables are set automatically by Travis CI. No manual setup needed.

---

### Bamboo

Detected when `bamboo_buildNumber` is set in the environment.

| Variable | Description | Example |
|---|---|---|
| `bamboo_buildNumber` | Sequential build number *(required for detection)* | `56` |
| `bamboo_resultsUrl` | URL to the Bamboo build results | `http://bamboo.example.com/browse/MY-PROJECT-56` |

> These variables are set automatically by Bamboo. No manual setup needed.

---

### Local Manual Run

If **none** of the above variables are detected, the report will show **"Local Run"** with build name `"Manual Execution"`. This is the default fallback for local development.

---

## Running in a Custom or Self-Hosted Environment

If you're using a custom CI system or a Docker container and want a specific runner to appear in the report, manually export the required variables before running your tests.

**Example — simulating a Jenkins build in a Docker container:**

```bash
docker run \
  -e JENKINS_HOME=/var/jenkins_home \
  -e JOB_NAME="my-test-suite" \
  -e BUILD_NUMBER=42 \
  -e BUILD_URL="http://jenkins.example.com/job/my-test-suite/42/" \
  my-test-image npm test
```

**Example — simulating a GitHub Actions build locally:**

```bash
export GITHUB_RUN_ID=9999999999
export GITHUB_RUN_NUMBER=1
export GITHUB_SERVER_URL=https://github.com
export GITHUB_REPOSITORY=my-org/my-repo

```
