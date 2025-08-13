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

            ✅ --reportSuccess Generate screenshot and video record with also successful tests
                Usage:   artes --reportSuccess
      
            📁 --features      Specify one or more feature files' relative paths to run (comma-separated)
                Usage:   artes --features "tests/features/Alma, tests/features/Banan.feature"

            📜 --stepDef       Specify one or more step definition files' relative paths to use (comma-separated)
                Usage:   artes --stepDef "tests/steps/login.js, tests/steps/home.js"
      
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
      
            🎭 --dryRun        Perform a dry run without executing tests
                Usage:   artes --dryRun

            📈 --percentage    Set minimum success percentage to pass test run
                Usage:   artes --percentage 85

            🌐 --browser       Specify browser to use (chromium, firefox, webkit)
                Usage:   artes --browser chromium

            🌐 --baseURL       Set base URL for the tests
                Usage:   artes --baseURL "https://example.com"

            📏 --maxScreen     Maximize browser window
                Usage:   artes --maxScreen

            📐 --width         Set browser width (default: 1280)
                Usage:   artes --width 1920

            📏 --height        Set browser height (default: 720)
                Usage:   artes --height 1080

            ⏱️ --timeout       Set timeout for each test step (default: 30 seconds)
                Usage:   artes --timeout 10
            
            🐢 --slowMo        Slow down text execution for clear view (default: 0 seconds)
                Usage:   artes --slowMo 1
      `);
}

module.exports = {
  showHelp,
};
