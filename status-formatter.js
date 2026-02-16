const { Formatter } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');

class StatusFormatter extends Formatter {
  constructor(options) {
    super(options);

    const outputDir = './test-status';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const workerId = process.env.CUCUMBER_WORKER_ID || '0';
    this.workerId = workerId;
    this.outputFile = path.join(outputDir, `test-results-${workerId}.txt`);
    this.outputDir = outputDir;

    fs.writeFileSync(this.outputFile, '', 'utf8');
    
    this.pickles = new Map();
    this.testCases = new Map();
    this.testCaseStartedIdToAttempt = new Map();

    const { eventBroadcaster } = options;

    eventBroadcaster.on('envelope', (envelope) => {
      if (envelope.pickle) {
        this.pickles.set(envelope.pickle.id, envelope.pickle);
      }

      if (envelope.testCase) {
        this.testCases.set(envelope.testCase.id, envelope.testCase);
      }

      if (envelope.testCaseStarted) {
        this.testCaseStartedIdToAttempt.set(
          envelope.testCaseStarted.id,
          envelope.testCaseStarted.testCaseId
        );
      }

      if (envelope.testCaseFinished) {
        this.handleTestCaseFinished(envelope.testCaseFinished);
      }

      if (envelope.testRunFinished) {
        this.handleTestRunFinished();
      }
    });
  }

  getFormattedTimestamp() {
    const now = new Date();
    const YYYY = now.getFullYear();
    const MM = String(now.getMonth() + 1).padStart(2, '0');
    const DD = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');

    return `${YYYY}${MM}${DD}-${hh}${mm}${ss}-${ms}`;
  }

  handleTestCaseFinished(testCaseFinished) {
    try {
      const timestamp = this.getFormattedTimestamp();
      
      const testCaseId = this.testCaseStartedIdToAttempt.get(
        testCaseFinished.testCaseStartedId
      );

      if (!testCaseId) return;

      const testCase = this.testCases.get(testCaseId);
      if (!testCase) return;

      const pickle = this.pickles.get(testCase.pickleId);
      if (!pickle) return;

      const testCaseAttempt = this.eventDataCollector.getTestCaseAttempt(
        testCaseFinished.testCaseStartedId
      );

      const status = testCaseAttempt?.worstTestStepResult?.status || 'UNKNOWN';

      const info = {
        name: pickle.name,
        id: pickle.id,
        uri: pickle.uri
      };

      const line = `${timestamp} | ${status.toUpperCase()} | ${info.name} | ${info.id} | ${info.uri}\n`;
      
      fs.appendFileSync(this.outputFile, line, 'utf8');
      
    } catch (error) {
      console.error('Error in handleTestCaseFinished:', error);
    }
  }

  handleTestRunFinished() {
    if (this.workerId !== '0') {
      return;
    }

    setTimeout(() => {
      this.mergeResults();
    }, 1000);
  }

  mergeResults() {
    try {
      const testStatusFile = path.join(this.outputDir, 'test-status.txt');
      
      const files = fs.readdirSync(this.outputDir)
        .filter(f => f.startsWith('test-results-') && f.endsWith('.txt'))
        .sort();

      if (files.length === 0) {
        console.log('No result files found to merge');
        return;
      }

      const combined = files
        .map(f => fs.readFileSync(path.join(this.outputDir, f), 'utf8'))
        .join('');

      fs.writeFileSync(testStatusFile, combined, 'utf8');

    } catch (error) {
      console.error('Error merging results:', error);
    }
  }
}

module.exports = StatusFormatter;
