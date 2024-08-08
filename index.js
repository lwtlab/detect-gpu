const { exec } = require("child_process");

/**
 * Executes a shell command and returns it as a promise.
 * @param {string} cmd - Command to run.
 * @returns {Promise<string>} - Promise resolving with the command output.
 */
function execCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Detects GPU information by executing a system command.
 * This function assumes the output is in a specific format that can be split into an array.
 * @returns {Promise<string[]>} - Promise resolving with an array of GPU information.
 */
async function detectGPU() {
  try {
    const output = await execCommand("ollama-gpu/ollama-gpu");
    return output.split("\n").filter((line) => line.trim() !== "");
  } catch (error) {
    throw error;
  }
}

module.exports = {
  detectGPU,
};
