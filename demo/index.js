const { detectGPU } = require("@lwtlab/detect-gpu");

detectGPU()
  .then((gpu) => {
    console.log(gpu);
  })
  .catch((error) => {
    console.error(error);
  });
