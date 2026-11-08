package app

// this file is like a composition root where you build your app instead of having a lot of
// repo/service/handler/routes for each endpoint, you have it here only, and inside main.go
// you only have app := app.New(), app.Run()

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"example.com/test/internal/api/users"
	"example.com/test/internal/config"
	"example.com/test/internal/middleware"
)

type App struct {
	mux *http.ServeMux
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

func (app *App) Run() error {
	server := app.cfgSrv()

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	errCh := make(chan error, 1)
	go func() {
		if err := server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
			errCh <- err
		}
	}()

	select {
	case err := <-errCh:
		return fmt.Errorf("some error: %w", err)
	case <-ctx.Done():
		stop()
	}

	shutDownCtx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := server.Shutdown(shutDownCtx); err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			_ = server.Close()
		}
		fmt.Errorf("shutdown %w", err)
	}

	log.Println("server closed successfully")
	return nil

}

func (app *App) cfgSrv() *http.Server {
	cfg := config.LoadSrvCfg()

	server := &http.Server{
		Addr: cfg.HTTPAddr,
		Handler: middleware.Chain(app.mux,
			middleware.Recovery,
			middleware.RequestID,
			middleware.Logging,
		),
	}

	return server
}
