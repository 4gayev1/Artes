function showHelp() {
    console.log(`
      Artes CLI
  
        Usage:
            npx artes [options]
  
        Options:
            -h, --help      Show this help message
            -v, --version   Show current version of artes
            -c, --create    Create example artes project
  
        For more options, use:
            artes report --help       Reporting & branding options
            artes browser --help      Browser & environment options
            artes execution --help    Execution control options
            artes ai --help           AI bug reporter options
    `);
  }
  
  function showReportingHelp() {
    console.log(`
      Artes CLI - Reporting & Branding
  
        Usage:
            npx artes [options]
  
        Options:
            -r, --report              Run tests and generate Allure report
                Usage: artes -r or artes --report
  
            --reportSuccess           Generate screenshot and video with successful tests too
                Usage: artes --reportSuccess
  
            -rwt, --reportWithTrace   Include trace in the report
                Usage: artes --reportWithTrace
  
            --trace                   Enable tracing for all tests
                Usage: artes --trace
  
            --singleFileReport        Generate single file Allure report
                Usage: artes -r --singleFileReport
  
            --zip                     Zip the report folder after generation
                Usage: artes -r --zip
  
            --logo                    Set a custom logo in the report sidebar
                Usage: artes --logo logo.png
  
            --brandName               Set the brand name displayed next to the logo
                Usage: artes --brandName 'My Company'
  
            --reportName              Report name on the summary widget
                Usage: artes --reportName 'Alma UI'
  
            --uploadReport            Upload the generated report to Artes Reporting System
                Usage: artes --uploadReport --reporterURL "https://example.com/upload"
  
            --reporterURL             URL of the Artes Reporting System
                Usage: artes --uploadReport --reporterURL "https://example.com/upload"
  
            --projectName             Project name in the Artes Reporting System (default: "Artes Report")
                Usage: artes --uploadReport --reporterURL "https://example.com/upload" --projectName "My Project"
  
            --projectType             Project type for reporting, e.g., UI, API (default: "Artes")
                Usage: artes --uploadReport --reporterURL "https://example.com/upload" --projectType "API"
  
            --reportPath              Path to the report zip or html file to upload (default: ./report.zip)
                Usage: artes --uploadReport --reporterURL "https://example.com/upload" --reportPath "./my_report.zip"
    `);
  }
  
  function showBrowserHelp() {
    console.log(`
      Artes CLI - Browser & Environment
  
        Usage:
            npx artes [options]
  
        Options:
            --browser     Specify browser to use (chromium, firefox, webkit)
                Usage: artes --browser chromium
  
            --device      Emulate a specific device (e.g., "iPhone 13")
                Usage: artes --device "iPhone 13"
  
            --maxScreen   Maximize browser window
                Usage: artes --maxScreen
  
            --width       Set browser width (default: 1280)
                Usage: artes --width 1920
  
            --height      Set browser height (default: 720)
                Usage: artes --height 1080
    `);
  }
  
  function showExecutionHelp() {
    console.log(`
      Artes CLI - Execution
  
        Usage:
            npx artes [options]
  
        Options:

            --headless    Run browser in headless mode
                Usage: artes --headless

            --baseURL     Set base URL for the tests
                Usage: artes --baseURL "https://example.com"
  
            --env         Set environment for the test run
                Usage: artes --env "dev"
  
            --offline     Run browser in offline mode
                Usage: artes --offline

            --features      Specify feature file paths to run (comma-separated)
                Usage: artes --features "tests/features/Alma, tests/features/Banan.feature"
  
            --stepDef       Specify step definition file paths to use (comma-separated)
                Usage: artes --stepDef "tests/steps/login.js, tests/steps/home.js"
  
            --tags          Run tests with specified Cucumber tags
                Usage: artes --tags "@smoke and not @wip"
  
            --parallel      Run tests in parallel mode
                Usage: artes --parallel 3
  
            --retry         Retry failed tests
                Usage: artes --retry 2
  
            --rerun         Rerun only failed tests from previous run
                Usage: artes --rerun @rerun.txt
  
            --dryRun        Perform a dry run without executing tests
                Usage: artes --dryRun
  
            --percentage    Set minimum success percentage to pass test run
                Usage: artes --percentage 85
  
            --timeout       Set timeout for each test step (default: 30 seconds)
                Usage: artes --timeout 10
  
            --slowMo        Slow down execution for clear view (default: 0)
                Usage: artes --slowMo 1
  
            --saveVar       Set variables from CLI
                Usage: artes --saveVar '{"armud":20,"banana":200}'
    `);
  }
  
  function showAIHelp() {
    console.log(`
      Artes CLI - AI Bug Reporter
  
        Usage:
            npx artes [options]
  
        Options:
            --ai            Enable AI-generated bug reports and test summaries
                Usage: artes --ai
  
            --aiModel       AI model to use for report generation.
                            (For supported AI models: https://github.com/4gayev1/Artes/blob/main/docs/aiProviders.md)
                Usage: artes --ai --aiModel "gemini 2.5 flash"
  
            --aiKey         API key for the selected AI provider
                Usage: artes --ai --aiKey "your-api-key"
  
            --aiURL         Local AI endpoint URL (e.g., Ollama, LM Studio). Overrides --aiModel and --aiKey when set
                Usage: artes --ai --aiURL "http://localhost:11434/api/chat"
  
            --aiLanguage    Language for AI-generated reports (default: "English")
                Usage: artes --ai --aiLanguage "Azerbaijani"
  
            --maxTokens     Maximum tokens for AI-generated reports (default: 4000)
                Usage: artes --ai --maxTokens 8000
  
            --maxReports    Maximum number of AI reports to generate per test run (default: 10)
                Usage: artes --ai --maxReports 5
    `);
  }
  
  module.exports = {
    showHelp,
    showReportingHelp,
    showBrowserHelp,
    showExecutionHelp,
    showAIHelp
  };