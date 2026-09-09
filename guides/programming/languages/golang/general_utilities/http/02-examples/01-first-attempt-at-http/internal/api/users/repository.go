package users

// repository files is for data manipulation (usually database)

import (
	"context"
	"errors"
)

var ErrNotFound = errors.New("user not found")

type Repository struct {
	users map[int]User
}

func NewRepository() *Repository {
	return &Repository{
		users: make(map[int]User),
	}
}

func (r *Repository) Create(ctx context.Context, user User) error {
	r.users[user.ID] = user

	return nil
}

func (r *Repository) Get(ctx context.Context, id int) (User, error) {
	user, ok := r.users[id]
	if !ok {
		return User{}, ErrNotFound
	}

	return user, nil
}
