const fs = require("fs");
const path = require("path");

function findDuplicateTestNames() {
    const testStatusFile = path.join(process.cwd(), "node_modules", "artes", "test-status", 'test-status.txt');
    
    if (!fs.existsSync(testStatusFile)) {
      console.error('test-status.txt not found');
      return;
    }
  
    const content = fs.readFileSync(testStatusFile, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
  
    const testNameToEntries = {};
  
    lines.forEach(line => {
      const parts = line.split(' | ');
      if (parts.length < 5) return;
  
      const testName = parts[2].trim();
      const filePath = parts[4].trim();
      const uuid = parts[3].trim();

      if (!testNameToEntries[testName]) {
        testNameToEntries[testName] = [];
      }
      
      const alreadyExists = testNameToEntries[testName].some(e => e.uuid === uuid);
      if (!alreadyExists) {
        testNameToEntries[testName].push({ filePath, uuid });
      }
    });
  
    const duplicates = {};
    
    Object.entries(testNameToEntries).forEach(([testName, entries]) => {
      if (entries.length > 1) {
        duplicates[testName] = entries.map(e => e.filePath);
      }
    });
  
    if (Object.keys(duplicates).length > 0) {
      console.warn('\n\x1b[33m[WARNING] Duplicate scenario names found: This will affect your reporting');    
      Object.entries(duplicates).forEach(([testName, files]) => {
        console.log(`\x1b[33m"${testName}" exists in:`);
        files.forEach(file => {
          console.log(`  - ${file}`);
        });
        console.log('');
      });
      console.log("\x1b[0m");
    } 
  
    return duplicates;
}

module.exports = { findDuplicateTestNames };