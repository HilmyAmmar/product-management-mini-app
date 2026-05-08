package routes

import (
	"product-api/handlers"

	"github.com/gin-gonic/gin"
)

func ProductRoutes(r *gin.Engine, productHandler *handlers.ProductHandler) {
	v1 := r.Group("/products")
	{
		v1.GET("", productHandler.GetProducts)
		v1.GET("/:id", productHandler.GetProductByID)
		v1.POST("", productHandler.CreateProduct)
		v1.PUT("/:id", productHandler.UpdateProduct)
		v1.DELETE("/:id", productHandler.DeleteProduct)
	}
}
