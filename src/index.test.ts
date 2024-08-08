import { detectGPU } from "./index";

test("detectGPU", async () => {
  const gpuInfos = await detectGPU();
  console.log(gpuInfos);
  expect(gpuInfos.length).toBeGreaterThanOrEqual(1);
});
