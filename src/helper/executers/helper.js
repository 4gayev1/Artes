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

            🚫 --noDeps       Skip installing dependencies when creating example project
                Usage:  artes -c --noDeps or artes --create --noDeps
      
            📊 -r, --report    Run tests and generate Allure report
                Usage:   artes -r or artes --report

            ✅ --reportSuccess Generate screenshot and video record with also successful tests
                Usage:   artes --reportSuccess

            ⚡ --trace         Enable tracing for all tests
                Usage:   artes --trace
            
            🔍 -rwt, --reportWithTrace Include trace in the report
                Usage:   artes --reportWithTrace
            
            📄 --singleFileReport   Generate single file Allure report
                Usage:   artes -r --singleFileReport

           🗜️ --zip            Zip the report folder after generation
                Usage:   artes -r --zip

            --uploadReport     Upload the generated report to a Artes Reporting System
                Usage:   artes --uploadReport --reporterURL "https://example.com/upload"
            
            --reporterURL      URL of the Artes Reporting System to upload the report
                Usage:   artes --uploadReport --reporterURL "https://example.com/upload"

            --projectName      Name of the project in the Artes Reporting System (default: "Artes Report")
                Usage:   artes --uploadReport --reporterURL "https://example.com/upload" --projectName "My Project"

            --projectType      Type of the project (e.g., UI, API) for reporting purposes (default: "Artes")
                Usage:   artes --uploadReport --reporterURL "https://example.com/upload" --projectType "API"

            --reportPath       Path to the report zip or html file to be uploaded (default: ./report.zip)
                Usage:   artes --uploadReport --reporterURL "https://example.com/upload" --reportPath "./my_report.zip"

            🖼️ --logo           Set a custom logo in the report sidebar  
                Usage:  artes --logo logo.png

            🏢 --brandName      Set the brand name displayed next to the logo in the report sidebar
                Usage:  artes --brandName 'My Company' 

            📄 --reportName      Report name displayed on the summary widget and in the Artes Reporting System
                Usage:  artes --reportName 'Alma UI' 
      
            📁 --features      Specify one or more feature files' relative paths to run (comma-separated)
                Usage:   artes --features "tests/features/Alma, tests/features/Banan.feature"

            📜 --stepDef       Specify one or more step definition files' relative paths to use (comma-separated)
                Usage:   artes --stepDef "tests/steps/login.js, tests/steps/home.js"
      
            🔖 --tags          Run tests with specified Cucumber tags
                Usage:   artes --tags "@smoke and not @wip"
      
            🌐 --env           Set environment for the test run
                Usage:   artes --env "dev"

            --saveVar         Set variables from cli
                        artes --saveVar '{"armud":20,"banana":200}'
      
            🕶️ --headless      Run browser in headless mode
                Usage:   artes --headless
      
            ⚡ --parallel      Run tests in parallel mode
                Usage:   artes --parallel 3
      
            🔁 --retry         Retry failed tests
                Usage:   artes --retry 2

            🔄 --rerun         Rerun only the failed tests from previous run
                Usage:   artes --rerun @rerun.txt
      
            🎭 --dryRun        Perform a dry run without executing tests
                Usage:   artes --dryRun

            📈 --percentage    Set minimum success percentage to pass test run
                Usage:   artes --percentage 85

            🌐 --browser       Specify browser to use (chromium, firefox, webkit)
                Usage:   artes --browser chromium
            
            --offline       Run browser in offline mode
                Usage:   artes --offline

            📱 --device       Emulate specific device (e.g., "iPhone 13")
                Usage:   artes --device "iPhone 13"

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
