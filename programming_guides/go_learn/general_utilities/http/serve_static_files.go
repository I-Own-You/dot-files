package main

import (
	"log"
	"net/http"
)

func ServeStaticFiles() {
	// here, when you make request on domain/static/ -> you will get all the files that can be served.
	//
	// under the hood, the request is not domain/static/ but domain/assets/static/,
	// because we hide(strip) the /static/ from url with http.StripPrefix("/static/"),
	// the url will act as domain/assets/, but the url will show domain/static/.
	//
	// this way you can acess any file domain/static/[myFileName].
	// if domain/static/ is accessed, a list of file that can be accessed will show.
	fs := http.FileServer(http.Dir("/home/mkc/assets/"))

	// here,
	// in the .Handle("/static/") its importatnt no note that "/static" without final slash wouldnt work for,
	// static files because "/static" would work as an exact match, but static files require /static/, because,
	// you need to acess files after it: /static/[myFileName].
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	log.Fatal(http.ListenAndServe(":3000", nil))

	// above you could define instead of assets, the word static because its more convenient
}
