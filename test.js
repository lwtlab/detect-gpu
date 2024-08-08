const { detectGPU } = require("./index");

detectGPU()
  .then((gpuInfo) => console.log(gpuInfo))
  .catch((error) => console.error("Error:", error));
