function showHelp() {
  console.log(`
    🚀 Artes - Playwright Test Runner

    Description:
        Artes is a test runner for Playwright that executes Cucumber tests
        and can generate Allure reports.

    Usage: 
        npx artes [options]

    Options:
        🆘 -h, --help      Show this help message
            Usage: artes -h or artes --help

        🏷️ -v, --version   Show current version of artes
            Usage: artes -v or artes --version

        🏗️ -c, --create    Create example project with artes
            Usage: artes -c or artes --create 

        ✅ -y, --yes       Skip confirmation prompt for creating example project
            Usage:  artes -c -y or artes --create --yes

        📊 -r, --report    Run tests and generate Allure report
            Usage:   artes -r or artes --report
    `);
}

module.exports = {
  showHelp,
};
