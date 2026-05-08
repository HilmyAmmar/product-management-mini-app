package services

import (
	"product-api/models"
	"product-api/repositories"
)

type ProductService interface {
	GetAll() ([]models.Product, error)
	GetByID(id int) (models.Product, error)
	Create(product models.Product) (models.Product, error)
	Update(id int, productRequest models.Product) (models.Product, error)
	Delete(id int) error
}

type service struct {
	repository repositories.ProductRepository
}

func NewProductService(repository repositories.ProductRepository) ProductService {
	return &service{repository}
}

func (s *service) GetAll() ([]models.Product, error) {
	return s.repository.FindAll()
}

func (s *service) GetByID(id int) (models.Product, error) {
	return s.repository.FindByID(id)
}

func (s *service) Create(product models.Product) (models.Product, error) {
	return s.repository.Create(product)
}

func (s *service) Update(id int, productRequest models.Product) (models.Product, error) {
	product, err := s.repository.FindByID(id)
	if err != nil {
		return product, err
	}

	product.Name = productRequest.Name
	product.Description = productRequest.Description
	product.Price = productRequest.Price
	product.Stock = productRequest.Stock
	product.Category = productRequest.Category
	product.IsActive = productRequest.IsActive

	updatedProduct, err := s.repository.Update(product)
	return updatedProduct, err
}

func (s *service) Delete(id int) error {
	product, err := s.repository.FindByID(id)
	if err != nil {
		return err
	}

	return s.repository.Delete(product)
}
