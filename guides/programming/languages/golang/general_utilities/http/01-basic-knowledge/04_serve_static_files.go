package main

import (
	"log"
	"net/http"
)

func ServeStaticFiles() {
	// 1. http.FileServer serves files from the directory you give it:
	fs := http.FileServer(http.Dir("/home/mkc/assets/"))
	//
	// 2. Then we mount this file server under /static/:
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	//
	// how this works, an example:
	// 1. brower requests /static/image.png
	// 2. http.StripPrefix removes: /static/
	// 3. FileServer receives: image.png
	// 4. FileSystem gets: /home/mkc/assets/image.png
	//
	// 1. /static/ is a url prefix
	// 2. /home/mkc/assets is a filesystem directory
	// 3. these 2 things can have different names (but usually will be the same)
	//
	// 1. last "/" inside "/static/(here)" the first argument to http.Handle is important because
	//    this path is meant to be accessed to not as final url but as retrieving resources like:
	//    /static/something.png, /static/1.txt, .etc
	// 2. but if you still access /static/ without a resource after last "/", depending on FileServer
	//    behaviour and folder content of /home/mkc/assets, it will usually show the content as a list

	log.Fatal(http.ListenAndServe(":3000", nil))
}
