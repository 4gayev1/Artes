const fs = require("fs");
const path = require("path");

function testCoverageCalculator({ silent = false } = {}) {
  const testStatusFile = path.join(
    process.cwd(),
    "node_modules",
    "artes",
    "test-status",
    "test-status.txt",
  );

  if (!fs.existsSync(testStatusFile)) {
    console.error("test-status.txt not found");
    return null;
  }

  const content = fs.readFileSync(testStatusFile, "utf8");
  const lines = content.split("\n").filter((line) => line.trim());

  const map = {};
  const retriedTests = [];
  const uuidRegex =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

  lines.forEach((line) => {
    const parts = line.split(" | ");
    if (parts.length < 5) return;

    const timestamp = parts[0].trim();
    const status = parts[1].trim();
    const scenario = parts[2].trim();
    const id = parts[3].trim();
    const uri = parts[4].trim();

    if (!uuidRegex.test(id)) return;

    if (!map[id]) {
      map[id] = {
        count: 1,
        latest: { status, scenario, timestamp, uri },
      };
    } else {
      map[id].count++;
      if (timestamp > map[id].latest.timestamp) {
        map[id].latest = { status, scenario, timestamp, uri };
      }
    }
  });

  let total = 0;
  let notPassed = 0;

  Object.entries(map).forEach(([id, data]) => {
    total++;

    if (data.count > 1) {
      retriedTests.push({
        scenario: data.latest.scenario,
        id,
        count: data.count,
      });
    }

    if (data.latest.status !== "PASSED") {
      notPassed++;
    }
  });

  if (!silent && retriedTests.length > 0) {
    console.warn(`\n\x1b[33mRetried ${retriedTests.length} test cases:`);
    retriedTests.forEach((t) => {
      console.warn(`- "${t.scenario}" ran ${t.count} times`);
    });
    console.log("\x1b[0m");
    console.log("");
  }

  return {
    percentage: ((total - notPassed) / total) * 100,
    totalTests: total,
    notPassed,
    passed: total - notPassed,
    latestStatuses: Object.fromEntries(
      Object.entries(map).map(([id, data]) => [id, data.latest.status]),
    ),
  };
}

module.exports = { testCoverageCalculator };
