
It's for detecting gpu info, based on Ollama's code.


## FAQ

### NVIDIA: symbol lookup for cuCtxCreate_v3 failed

```
2024/08/21 15:19:10 INFO unable to load cuda driver library library=C:\Windows\system32\nvcuda.dll error="symbol lookup for cuCtxCreate_v3 failed: \xd5Ҳ\xbb\xb5\xbdָ\xb6\xa8\xb5ĳ\xcc\xd0\xf2\xa1\xa3\r\n"
```

CUDA Driver API 版本至少需要 11.4。不然没有 cuCtxCreate_v3 这个方法。 https://docs.nvidia.com/cuda/archive/11.4.0/cuda-driver-api/group__CUDA__CTX.html
11.3.1 就没有：https://docs.nvidia.com/cuda/archive/11.3.1/cuda-driver-api/group__CUDA__CTX.html


所有版本见：https://developer.nvidia.com/cuda-toolkit-archive
