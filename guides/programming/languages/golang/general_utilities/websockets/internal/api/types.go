package api

import (
	"sync"

	"github.com/gorilla/websocket"
)

type connMutex struct {
	conn   *websocket.Conn
	userId string
	mutex  sync.Mutex
}

type UserPayload struct {
	UserId string `json:"userId"`
	Data   string `json:"data"`
}
