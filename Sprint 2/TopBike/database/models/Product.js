module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // esto debería estar en singular
    
    let cols = {
            id: {
                type: dataTypes.BIGINT(10).UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
    
            name: {
                type: dataTypes.STRING(100),
                allowNull: false
            },
            
            image: {
                type: dataTypes.STRING(100),
                allowNull: false
            },
            stock: {
                type: dataTypes.INTEGER(),
                allowNull: false
            },
            price: dataTypes.DECIMAL(10,2),
    
            discount: dataTypes.INTEGER(),
    
            category_id: dataTypes.BIGINT(10),
            color_id: dataTypes.BIGINT(10),
            brand_id: dataTypes.BIGINT(10),
    
    
    
        };
    
        let config = {
            tableName: 'products',
            timestamps: true,
            createdAt: true,
            updatedAt: true,
    
        };
    
    
     const Product = sequelize.define(alias,cols,config);
    
    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    
        Product.associate = function (models) {
            Product.belongsTo(models.ProductCategory, { 
                as: "productscategories",
                foreignKey: "category_id"
            }),
    
            Product.belongsTo(models.ProductColor, { 
                as: "productscolors",
                foreignKey: "color_id"
            }),
    
            Product.belongsTo(models.ProductBrand, { 
                as: "productsbrands",
                foreignKey: "brand_id"
            }),
    
    
            Product.hasMany(models.ShoppingCart, { 
                as: "productShopping",
                foreignKey: 'product_id',
    
            })
    
    
        }
    
    
    
    
    
    
    
    
    
    
    
        return Product
    }
    