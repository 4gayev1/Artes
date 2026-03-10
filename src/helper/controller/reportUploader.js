const fs = require("fs");

async function uploadReport({ 
  reporterURL, 
  projectName,
  projectType, 
  reportName, 
  reportPath
}) {
  
  const formData = new FormData();

  const fileBuffer = fs.readFileSync(reportPath);
  const fileBlob = new Blob([fileBuffer], { type: "application/x-zip-compressed" });
  formData.append("file", fileBlob, "report.zip");
  formData.append("name", reportName);
  formData.append("project", projectName);
  formData.append("type", projectType);

  const response = await fetch(reporterURL, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  console.log("Report URL:", data.report.report_url);

  return data;
}

module.exports = {
  uploadReport
};