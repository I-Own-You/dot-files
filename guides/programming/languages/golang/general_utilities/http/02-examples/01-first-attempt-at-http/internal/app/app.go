package app

// this file is like a composition root where you build your app instead of having a lot of
// repo/service/handler/routes for each endpoint, you have it here only, and inside main.go
// you only have app := app.New(), app.Run()

import (
	"log"
	"net/http"

	"example.com/test/internal/api/users"
	"example.com/test/internal/config"
	"example.com/test/internal/middleware"
)

type App struct {
	mux         *http.ServeMux
	server      *http.Server
	middlewares http.Handler
}

func New() *App {
	mux := http.NewServeMux()

	return &App{
		mux: mux,
	}
}

func (app *App) Routes() {
	usersRepo := users.NewRepository()
	usersService := users.NewService(usersRepo)
	usersHandler := users.NewHandler(usersService)

	users.Routes(app.mux, usersHandler)
}

func (app *App) Middlewares() {
	handler := middleware.Recovery(app.mux)
	handler = middleware.RequestID(handler)
	handler = middleware.Logging(handler)

	app.middlewares = handler
}

func (app *App) Run() {
	app.serverConfig()

	if err := app.server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func (app *App) serverConfig() {
	cfg := config.LoadServerConfig()

	server := &http.Server{
		Addr:    cfg.HTTPAddr,
		Handler: app.mux,
	}

	if handler := app.middlewares; handler != nil {
		server.Handler = handler
	}

	app.server = server
}
