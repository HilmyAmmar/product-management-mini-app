package repositories

import (
	"product-api/models"

	"gorm.io/gorm"
)

type ProductRepository interface {
	FindAll() ([]models.Product, error)
	FindByID(id int) (models.Product, error)
	Create(product models.Product) (models.Product, error)
	Update(product models.Product) (models.Product, error)
	Delete(product models.Product) error
}

type repository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) ProductRepository {
	return &repository{db}
}

func (r *repository) FindAll() ([]models.Product, error) {
	var products []models.Product
	err := r.db.Find(&products).Error
	return products, err
}

func (r *repository) FindByID(id int) (models.Product, error) {
	var product models.Product
	err := r.db.First(&product, id).Error
	return product, err
}

func (r *repository) Create(product models.Product) (models.Product, error) {
	err := r.db.Create(&product).Error
	return product, err
}

func (r *repository) Update(product models.Product) (models.Product, error) {
	err := r.db.Save(&product).Error
	return product, err
}

func (r *repository) Delete(product models.Product) error {
	err := r.db.Delete(&product).Error
	return err
}
