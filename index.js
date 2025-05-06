import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url"; // Import necessary functions from url

// Get the directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findHtmlFiles() {
  const wwwrootPath = path.join(__dirname, "wwwroot");
  try {
    const files = fs.readdirSync(wwwrootPath);
    const htmlFiles = files.filter((file) => {
      return path.extname(file).toLowerCase() === ".html" && file.toLowerCase() !== "index.html";
    });
    return htmlFiles;
  } catch (err) {
    console.error("Error reading wwwroot directory:", err);
    return []; // Return empty array on error
  }
}

function build() {
  const htmlFiles = findHtmlFiles();
  const outputPath = path.join(__dirname, "wwwroot", "index.json");
  try {
    fs.writeFileSync(outputPath, JSON.stringify(htmlFiles, null, 2)); // Use null, 2 for pretty printing
    console.log(`Successfully wrote index.json to ${outputPath}`);
  } catch (err) {
    console.error("Error writing index.json:", err);
  }
}

// Example usage (optional):
// const otherHtmlFiles = findHtmlFiles();
// console.log(otherHtmlFiles);
// build();

// Check if the script is being run directly using ES Module syntax
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  build(); // Call the build function if run directly
}
