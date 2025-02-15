const { execSync } = require("child_process");

try {
  console.log("Checking for relevant changes...");
  const changedFiles = execSync("git diff --name-only HEAD^ HEAD").toString();

  // Define the folder(s) that trigger a deployment
  const watchFolders = ["web-workspace/"];

  const shouldDeploy = changedFiles
    .split("\n")
    .some((file) => watchFolders.some((folder) => file.startsWith(folder)));

  if (!shouldDeploy) {
    console.log("No relevant changes detected. Skipping deploy.");
    process.exit(1); // Exit with a non-zero status to cancel deployment
  }
} catch (error) {
  console.error("Error checking for changes:", error);
  process.exit(1); // Fail-safe: prevent deployment on error
}
