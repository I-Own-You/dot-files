package config

import "os"

// 1. this file usually holds the config of whole project
// 2. when config.go gets too big and has different parts of it associated with different locations
//    in the project, you can create a seaprate server_config.go, user_config.go, .etc and then
//    create a struct here like:
//
//	  type Config struct {
//	      Server ServerConfig
//        User UserConfig
//    }
//
//    this is usually done if config.go gets really big

type ServerConfig struct {
	HTTPAddr string
}

type UserConfig struct {
	// to be done
}

func LoadServerConfig() ServerConfig {
	return ServerConfig{
		HTTPAddr: os.Getenv("HTTP_ADDR"),
	}
}
