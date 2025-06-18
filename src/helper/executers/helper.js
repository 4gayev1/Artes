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
      
            📁 --features      Specify one or more feature files' relative paths to run (comma-separated)
                Usage:   artes --features "tests/features/Alma, tests/features/Banan.feature"
      
            🔖 --tags          Run tests with specified Cucumber tags
                Usage:   artes --tags "@smoke and not @wip"
      
            🌐 --env           Set environment for the test run
                Usage:   artes --env "dev"
      
            🕶️ --headless      Run browser in headless mode
                Usage:   artes --headless
      
            ⚡ --parallel      Run tests in parallel mode
                Usage:   artes --parallel 3
      
            🔁 --retry         Retry failed tests
                Usage:   artes --retry 2
      
            🎭 --dryrun        Perform a dry run without executing tests
                Usage:   artes --dryrun

            📈 --percentage    Set minimum success percentage to pass test run
                Usage:   artes --percentage 85
      `);
}

module.exports = {
  showHelp,
};
