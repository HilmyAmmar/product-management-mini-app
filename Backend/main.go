package main

import (
	"os"
	"product-api/config"
	"product-api/handlers"
	"product-api/repositories"
	"product-api/routes"
	"product-api/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	config.ConnectDatabase()

	productRepo := repositories.NewProductRepository(config.DB)
	productService := services.NewProductService(productRepo)
	productHandler := handlers.NewProductHandler(productService)

	r := gin.Default()
	r.Use(cors.Default())

	routes.ProductRoutes(r, productHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
