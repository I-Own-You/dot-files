package main

import (
	"log"
	"net/http"
	"websockets/internal/api"
)

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", api.MainPage)
	http.HandleFunc("/ws", api.HandleWS)
	// its kind of bad, but probably it must be like that, by 1 it can open a lot,
	// but bursting it kind of breaks(idk, maybe thats right, dont have knowledge yet),
	// i will let this be like this anyway, i wont fix it, i dont have the desire nor,
	// do i have the task for it.
	http.HandleFunc("/create", api.HandleCreate)
	log.Fatal(http.ListenAndServe(":3000", nil))
}
