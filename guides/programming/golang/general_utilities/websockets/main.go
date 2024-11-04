package main

import (
	"fmt"
	"html/template"
	"log"
	"net"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

const (
	idle     = 5 * time.Minute
	pingTime = 5 * time.Second
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
	// the CheckOrigin function basically needs to return true/false,
	// if the origin meets the origin we need, but it also can return nil,
	// whih means a safe default is used.
	//
	//  CheckOrigin: func(r *http.Request) bool {
	// 	origin := r.Header.Get("Origin")
	// 	return origin == "http://localhost:3000" // Only allow this origin
	// },
}

func handler(w http.ResponseWriter, r *http.Request) {
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

func handleWS(w http.ResponseWriter, r *http.Request) {
	// if upgrade is successfull, the connection is considered opened
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade error: ", err)
		return
	}
	defer conn.Close()

	fmt.Println("connection opened!")

	// this is how you can setup a time limit on read/write data,
	// if time is over, any read/write operation will corrupt the connection,
	// and future read/write operations will return errors.
	if err := conn.SetReadDeadline(time.Now().Add(idle)); err != nil {
		log.Println("setting deadline for read failed: %w\n", err)
	}
	if err := conn.SetWriteDeadline(time.Now().Add(idle)); err != nil {
		log.Println("setting deadline for write failed: %w\n", err)
	}

	// this way you can reset the read/write deadlines by handling incoming pongs,
	// from the peers.
	// this kind of checking for activity is for apps that rely more on ping/pong,
	// signals rather than data sent(like messages in chat).
	conn.SetPongHandler(func(appData string) error {
		if err := conn.SetReadDeadline(time.Now().Add(idle)); err != nil {
			log.Println("setting deadline for read failed: %w\n", err)
			return err
		}
		if err := conn.SetWriteDeadline(time.Now().Add(idle)); err != nil {
			log.Println("setting deadline for write failed: %w\n", err)
			return err
		}
		return nil
	})

	idleConn := make(chan bool, 1)
	for {
		select {
		case <-idleConn:
			newTicker := time.Tick(pingTime)
			for range 3 {
				<-newTicker
				if err := conn.WriteMessage(websocket.PingMessage, nil); err != nil {
					log.Println("error writing ping message while in timeout state.")
					return
				}

				msgType, _, err := conn.ReadMessage()
				if err != nil {
					log.Println("error reading pong data while in timeout state.")
					return
				}
				if msgType == websocket.PongMessage {
					if err := conn.SetReadDeadline(time.Now().Add(idle)); err != nil {
						log.Println("setting deadline for read while in timeout state: %w\n", err)
						return
					}
					if err := conn.SetWriteDeadline(time.Now().Add(idle)); err != nil {
						log.Println("setting deadline for write while in timeout state: %w\n", err)
						return
					}
					break
				}
			}
			if err := conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, "")); err != nil {
				log.Println("error writing close message while in timeout state.")
			}
			return
		default:
			// this is how you read the incoming messages
			now := time.Now()
			msgType, data, err := conn.ReadMessage()
			// leave here as example for timeout check
			// if netErr, ok := err.(net.Error); ok && netErr.Timeout() {
			// 	log.Println("timeout: read deadline.")
			// 	idleConn <- true
			// 	break
			// }
			if time.Since(now) >= time.Minute {

			} else if err != nil {
				log.Println("unexpected error occured while reading data.")
				if err = conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, "")); err != nil {
					log.Printf("error writing close message while reading message: %v", err)
					return
				}
				time.Sleep(time.Second)
				return
			} else {
				err := conn.SetReadDeadline(time.Now().Add(idle))
				if err != nil {
					log.Println("setting deadline for read while reading data failed: %w\n", err)
					return
				}
			}

			// here is how you can end a connection
			if string(data) == "bad_word" {
				// from the design of websockets, you must gracefully close the connection,
				// by sending a close message so that the client can be informed and,
				// do some cleanup or whatever.
				if err := conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, "")); err != nil {
					log.Printf("error writing close message while checking for bad word: %v", err)
					return
				}
				// wait some time so the client can have some time to perform some actions,
				// usually it will be more than 1 second.
				time.Sleep(time.Second)
				// the point is, you have more than 1 second, like 10, you can open connection,
				// after the close message above was sent, but eventually, after 10 second the connection,
				// will be closed so that you cannot open any other more.
				conn.Close()

				fmt.Printf("connection closed.\n")
				return
			}

			fmt.Printf("data received: %v\n", string(data))

			// this is how you send data
			err = conn.WriteMessage(msgType, data)
			if netErr, ok := err.(net.Error); ok && netErr.Timeout() {
				log.Println("timeout: write deadline.")
				idleConn <- true
				break
			} else if err != nil {
				log.Println("unexpected error occured while writing data.")
				if err = conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, "")); err != nil {
					log.Printf("error writing close message while writing message: %v", err)
					return
				}
				time.Sleep(time.Second)
				return
			} else {
				err := conn.SetWriteDeadline(time.Now().Add(idle))
				if err != nil {
					log.Println("setting deadline for write while writing data failed: %w\n", err)
				}
			}
			fmt.Printf("data was sent: %v\n", string(data))
		}
	}
}

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", handler)
	http.HandleFunc("/ws", handleWS)
	log.Fatal(http.ListenAndServe(":3000", nil))
}
