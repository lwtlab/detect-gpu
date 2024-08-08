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
