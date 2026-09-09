package users

import (
	"context"
	"errors"
)

// service files are for app logic (also called business logic of the app)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{
		repo: repo,
	}
}

func (s *Service) Create(ctx context.Context, name string) (User, error) {
	if name == "" {
		return User{}, errors.New("name is required")
	}

	user := User{
		ID:   len(s.repo.users) + 1,
		Name: name,
	}

	if err := s.repo.Create(ctx, user); err != nil {
		return User{}, err
	}

	return user, nil
}

func (s *Service) Get(ctx context.Context, id int) (User, error) {
	return s.repo.Get(ctx, id)
}
