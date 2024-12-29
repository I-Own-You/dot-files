package api

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"text/template"
	"time"

	"github.com/gorilla/websocket"
)

func MainPage(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("./static/html/index.html")

	if err != nil {
		http.Error(w, "Unable to load html file", http.StatusInternalServerError)
		return
	}

	if err := tmpl.Execute(w, nil); err != nil {
		http.Error(w, "Unable to load html file", http.StatusInternalServerError)
		return
	}
}

func HandleWS(w http.ResponseWriter, r *http.Request) {
	c, err := connect(w, r)
	if err != nil {
		log.Printf("websocket upgrade error: %v.\n", err)
		return
	}

	linkUserToConn(c, r)
	handleConn(c)

	// kind of unusable in my app, because i dont have ping/pong reliance, its a talk,
	// with a browser, it doesnt have ping mechanism, or if it would have, it would be,
	// something like socket.send("ping"), and this is handled through conn.ReadMessage()
	// setPongHandler(c)

}

func HandleCreate(w http.ResponseWriter, r *http.Request) {
	dialer := websocket.Dialer{}

	for counter := range 1000 {
		time.Sleep(time.Millisecond * 10)

		go func() {
			link := fmt.Sprintf("ws://localhost:3000/ws?user=user%v", strconv.Itoa(counter))
			_, _, err := dialer.Dial(link, nil)
			if err != nil {
				log.Printf("error creating connection from client: %v.\n", err)
			}
		}()

	}
}
