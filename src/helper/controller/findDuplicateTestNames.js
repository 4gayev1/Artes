const fs = require("fs");
const path = require("path");

function findDuplicateTestNames() {
    const testStatusFile = path.join(process.cwd(), "node_modules", "artes" , "test-status", 'test-status.txt');
    
    if (!fs.existsSync(testStatusFile)) {
      console.error('test-status.txt not found');
      return;
    }
  
    const content = fs.readFileSync(testStatusFile, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
  
    const testNameToFiles = {};
  
    lines.forEach(line => {
      const parts = line.split(' | ');
      if (parts.length < 5) return;
  
      const testName = parts[2].trim();
      const filePath = parts[4].trim();
  
      if (!testNameToFiles[testName]) {
        testNameToFiles[testName] = new Set();
      }
      
      testNameToFiles[testName].add(filePath);
    });
  
    const duplicates = {};
    
    Object.entries(testNameToFiles).forEach(([testName, files]) => {
      if (files.size > 1) {
        duplicates[testName] = Array.from(files);
      }
    });
  
    if (Object.keys(duplicates).length > 0) {
      console.warn('\n\x1b[33m[WARNING] Duplicate scenarios names found: This will effect your reporting');    
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

module.exports = {findDuplicateTestNames}