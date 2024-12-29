package main

import (
	"crypto/sha256"
	"fmt"
)

// SHA256 hashes are frequently used to compute short identities for binary or text blobs.
// for example, TLS/SSL certificates use SHA256 to compute a certificate’s signature.
// here’s how to compute SHA256 hashes in Go.

// crypto packages has several hash functions

func main() {
	s := "sha256 this string"

	h := sha256.New()

	h.Write([]byte(s))

	bs := h.Sum(nil)

	fmt.Println(s)
	fmt.Printf("%x\n", bs)
}
