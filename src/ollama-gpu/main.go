package main

import (
	"encoding/json"
	"fmt"

	"github.com/ollama/ollama/gpu"
)

func main() {
	data, err := json.Marshal(gpu.GetGPUInfo())
	if err != nil {
		// not possible
		// just return empty array
		fmt.Println("[]")
		return
	}
	fmt.Println(string(data))
}
