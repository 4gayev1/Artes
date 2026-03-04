function getExecutor() {

    if (process.env.GITHUB_RUN_ID) {
      return {
        name: "GitHub Actions",
        type: "github",
        buildName: `Workflow #${process.env.GITHUB_RUN_NUMBER}`,
        buildOrder: Number(process.env.GITHUB_RUN_NUMBER),
        buildUrl: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      };
  
  
    } else if (process.env.JENKINS_HOME) {
      return {
        name: "Jenkins",
        type: "jenkins",
        buildName: process.env.JOB_NAME || "Manual Run",
        buildOrder: Number(process.env.BUILD_NUMBER) || 1,
        buildUrl: process.env.BUILD_URL || ""
      };
  
  
    } else if (process.env.CI_PIPELINE_ID) {
      return {
        name: "GitLab CI",
        type: "gitlab",
        buildName: `Pipeline #${process.env.CI_PIPELINE_IID}`,
        buildOrder: Number(process.env.CI_PIPELINE_IID) || 1,
        buildUrl: process.env.CI_PIPELINE_URL || ""
      };
  
  
    } else if (process.env.BITBUCKET_BUILD_NUMBER) {
      return {
        name: "Bitbucket Pipelines",
        type: "bitbucket",
        buildName: `Build #${process.env.BITBUCKET_BUILD_NUMBER}`,
        buildOrder: Number(process.env.BITBUCKET_BUILD_NUMBER),
        buildUrl: process.env.BITBUCKET_BUILD_URL || ""
      };
  
  
    } else if (process.env.CIRCLE_WORKFLOW_ID) {
      return {
        name: "CircleCI",
        type: "circleci",
        buildName: `Workflow #${process.env.CIRCLE_WORKFLOW_ID}`,
        buildOrder: Number(process.env.CIRCLE_BUILD_NUM) || 1,
        buildUrl: process.env.CIRCLE_BUILD_URL || ""
      };
  
  
    } else if (process.env.BUILD_BUILDID) {
      return {
        name: "Azure Pipelines",
        type: "azure",
        buildName: `Build #${process.env.BUILD_BUILDID}`,
        buildOrder: Number(process.env.BUILD_BUILDID) || 1,
        buildUrl: process.env.BUILD_BUILDURI || ""
      };
  
  
    } else if (process.env.BUILD_NUMBER && process.env.TEAMCITY_VERSION) {
      return {
        name: "TeamCity",
        type: "teamcity",
        buildName: `Build #${process.env.BUILD_NUMBER}`,
        buildOrder: Number(process.env.BUILD_NUMBER) || 1,
        buildUrl: process.env.BUILD_URL || ""
      };
  
  
    } else if (process.env.TRAVIS_BUILD_NUMBER) {
      return {
        name: "Travis CI",
        type: "travis",
        buildName: `Build #${process.env.TRAVIS_BUILD_NUMBER}`,
        buildOrder: Number(process.env.TRAVIS_BUILD_NUMBER) || 1,
        buildUrl: process.env.TRAVIS_BUILD_WEB_URL || ""
      };
  
  
    } else if (process.env.bamboo_buildNumber) {
      return {
        name: "Bamboo",
        type: "bamboo",
        buildName: `Build #${process.env.bamboo_buildNumber}`,
        buildOrder: Number(process.env.bamboo_buildNumber) || 1,
        buildUrl: process.env.bamboo_resultsUrl || ""
      };
  
  
    } else {
      return {
        name: "Local Run",
        type: "local",
        buildName: "Manual Execution",
        buildOrder: 1,
        buildUrl: ""
      };
    }
  }

module.exports = { getExecutor };