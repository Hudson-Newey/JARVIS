package main

import (
	"fmt"
	"os"
	"net/http"
	"strings"
)

func main() {
	server := "http://localhost:8080"
	toProcess := os.Args[1]

	// check if the request is a web protocol
	// else assume it is a speech request
	if (strings.Contains(toProcess, "://")) {
		sendWebpage(server, toProcess)
	} else {
		// speech request
		fmt.Println("Say " + toProcess)
	}
}

// sends webpage to remote display-screen
func sendWebpage(server string, content string) {
	url := server + "/?q=" + content
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
}
