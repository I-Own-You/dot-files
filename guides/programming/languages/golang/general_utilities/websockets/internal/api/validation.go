package api

import "log"

func isDataValid(data string) bool {
	if data == "bad_word" {
		log.Printf("bad word detected: %v.\n", data)
		return false
	}
	return true
}
