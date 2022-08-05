package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB
var err error

type product struct {
	ID          uint    `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Categorie   string  `json:"categorie"`
}

func main() {

	db, _ = gorm.Open("mysql", "root:Safietou01@tcp(127.0.0.1:3306)/produtsGo?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	db.AutoMigrate(&product{})
	r := gin.Default()
	r.Use(CORS)
	r.GET("/products", GetAllProducts)
	r.GET("/products/:id", GetProduct)
	r.POST("/products", CreateProduct)
	r.PUT("/products/:id", UpdateProduct)
	r.DELETE("/products/:id", DeleteProduct)
	r.Run(":8080")

}

func GetAllProducts(c *gin.Context) {
	var prod []product
	if err := db.Find(&prod).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, prod)
	}
}
func GetProduct(c *gin.Context) {
	id := c.Params.ByName("id")
	var prod product
	if err := db.Where("id = ?", id).First(&prod).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, prod)
	}
}
func CreateProduct(c *gin.Context) {
	var prod product
	c.BindJSON(&prod)
	db.Create(&prod)
	c.JSON(200, prod)
}
func UpdateProduct(c *gin.Context) {
	var prod product
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&prod).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&prod)
	db.Save(&prod)
	c.JSON(200, prod)
}
func DeleteProduct(c *gin.Context) {
	id := c.Params.ByName("id")
	var prod product
	d := db.Where("id = ?", id).Delete(&prod)
	fmt.Println(d)
	c.JSON(200, gin.H{"Employee with ID# " + id: "is deleted"})
}

func HelloHandler(w http.ResponseWriter, _ *http.Request) {

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:5501")
	w.Header().Set("Access-Control-Max-Age", "15")
	fmt.Fprintf(w, "Hello, there!")
}

// CORS Middleware
func CORS(c *gin.Context) {

	// Tout d'abord, nous ajoutons les en-têtes avec besoin d'activer CORS
	// Assurez-vous d'ajuster ces en-têtes à vos besoins
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "*")
	c.Header("Access-Control-Allow-Headers", "*")
	c.Header("Content-Type", "application/json")

	// Deuxièmement, nous traitons le problème OPTIONS
	if c.Request.Method != "OPTIONS" {

		c.Next()

	} else {

		// Chaque fois que nous recevons une requête OPTIONS,
		// nous renvoyons juste un code d'état HTTP 200
		// Comme ça, Angular peut maintenant faire le vrai
		// requête en utilisant une autre méthode que OPTIONS
		c.AbortWithStatus(http.StatusOK)
	}
}
