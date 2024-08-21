const { detectGPU } = require("@littlegun/detect-gpu");

detectGPU()
  .then((gpu) => {
    console.log(gpu);
  })
  .catch((error) => {
    console.error(error);
  });
