package api

import (
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{
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
	conns      = make(map[string]*connMutex)
	connsMutex sync.RWMutex
)
