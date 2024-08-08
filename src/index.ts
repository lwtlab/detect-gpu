import { exec } from "child_process";
import path from "path";

const { platform, arch } = process;
// https://github.com/ollama/ollama/blob/c4cf8ad55966cc61c73f119ab9cbfaf57264fc81/gpu/types.go#L17
export interface GpuInfo {
  total_memory?: number;
  free_memory?: number;
  free_swap?: number;
  library?: string;
  variant: number;
  lib_path?: string;
  gpu_id: string;
  name: string;
  compute: string;
  driver_major?: number;
  driver_minor?: number;
}

/**
 * Execute a shell command and return a Promise.
 * @param cmd - The command to run.
 * @returns Promise that resolves to the command output.
 */
function execCommand(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        // log in stderr
        // } else if (stderr) {
        //   reject(new Error(stderr));
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Detect GPU information by executing system commands.
 * @returns Promise that resolves to an array of GPU information.
 */
export async function detectGPU(): Promise<GpuInfo[]> {
  let filename = "ollama-gpu";
  if (platform === "win32") {
    filename = "ollama-gpu.exe";
  }
  const commandPath = path.join(
    __dirname,
    "bin",
    `${platform}-${arch}`,
    filename
  );

  // Check if the file exists
  const fs = await import("fs").then((module) => module.promises);
  try {
    await fs.access(commandPath, fs.constants.F_OK);
  } catch (error) {
    throw new Error(`GPU detection tool does not exist: ${commandPath}`);
  }

  try {
    const output = await execCommand(commandPath);
    const gpuInfos: GpuInfo[] = JSON.parse(output);
    return gpuInfos;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse GPU information: Invalid JSON format");
    }
    throw new Error(`GPU detection failed: ${(error as Error).message}`);
  }
}
