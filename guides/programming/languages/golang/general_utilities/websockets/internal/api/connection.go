package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

func linkUserToConn(c *connMutex, r *http.Request) {
	user := r.URL.Query().Get("user")
	c.userId = user

	connsMutex.Lock()
	conns[user] = c
	fmt.Printf("len(conns): %v\n", len(conns))
	connsMutex.Unlock()
}

func handleConn(c *connMutex) {
	defer closeConn(c)
	setReadDeadline(c)
	setWriteDeadline(c)
	processMessages(c)
}

func connect(w http.ResponseWriter, r *http.Request) (*connMutex, error) {
	conn, err := upgrader.Upgrade(w, r, nil)
	fmt.Println("connection opened!")
	return &connMutex{conn: conn}, err
}

func processMessages(c *connMutex) {
	for {
		msgType, data, err := c.conn.ReadMessage()
		if err != nil {
			log.Printf("error reading data: %v.\n", err)
			return
		}

		var recv UserPayload
		if err := json.Unmarshal(data, &recv); err != nil {
			log.Println("error unmarshalling data.")
			return
		}

		if !isDataValid(recv.Data) {
			return
		}

		connsMutex.RLock()
		recipient, ok := conns[recv.UserId]
		connsMutex.RUnlock()

		if ok {
			recipient.mutex.Lock()
			err := recipient.conn.WriteMessage(msgType, []byte(recv.Data))
			if err != nil {
				log.Printf("error writing data: %v.\n", err)
				return
			}
			recipient.mutex.Unlock()
		}

		setWriteDeadline(c)
		setReadDeadline(c)
	}
}

func closeConn(c *connMutex) {
	c.mutex.Lock()
	if err := c.conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, "server timeout")); err != nil {
		log.Printf("could not write a close message: %v.\n", err)
	}
	c.conn.Close()
	c.mutex.Unlock()

	connsMutex.Lock()
	conns[c.userId] = nil
	delete(conns, c.userId)
	connsMutex.Unlock()
}

func setReadDeadline(c *connMutex) {
	c.mutex.Lock()
	if err := c.conn.SetReadDeadline(time.Now().Add(timeout)); err != nil {
		log.Printf("setting deadline for read failed: %v.\n", err)
		return
	}
	c.mutex.Unlock()
}

func setWriteDeadline(c *connMutex) {
	c.mutex.Lock()
	if err := c.conn.SetWriteDeadline(time.Now().Add(timeout)); err != nil {
		log.Printf("setting deadline for write failed: %v.\n", err)
		return
	}
	c.mutex.Unlock()
}

// func setPongHandler(c *connMutex) {
// 	log.Println("setting pong handler.")
//
// 	c.conn.SetPongHandler(func(appData string) error {
// 		log.Println("pong handler set.")
// 		return nil
// 	})
// }
