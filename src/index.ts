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
 * 执行shell命令并返回一个Promise。
 * @param cmd - 要运行的命令。
 * @returns Promise解析为命令输出。
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
 * 通过执行系统命令检测GPU信息。
 * @returns Promise解析为GPU信息数组。
 */
export async function detectGPU(): Promise<GpuInfo[]> {
  let filename = "ollama-gpu";
  if (platform === "win32") {
    filename = "ollama-gpu.exe";
  }
  const command = path.join(__dirname, "bin", `${platform}-${arch}`, filename);
  try {
    const output = await execCommand(command);
    const gpuInfos: GpuInfo[] = JSON.parse(output);
    return gpuInfos;
  } catch (error) {
    throw error;
  }
}
