import { exec } from "child_process";

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
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * 通过执行系统命令检测GPU信息。
 * 此函数假设输出格式可以被分割成数组。
 * @returns Promise解析为GPU信息数组。
 */
export async function detectGPU(): Promise<GpuInfo[]> {
  try {
    const output = await execCommand("ollama-gpu/ollama-gpu");
    const gpuInfos: GpuInfo[] = JSON.parse(output);
    return gpuInfos;
  } catch (error) {
    throw error;
  }
}
