module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // esto debería estar en singular
    
    let cols = {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
    
            name: {
                type: dataTypes.STRING(50),
                allowNull: false
            },

            price: {
                type: dataTypes.FLOAT.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            discount: {
                type: dataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            id_category: {
                type: dataTypes.INTEGER,
                allowNull: false,   
            },
            /* description: dataTypes.STRING(200),
            image: dataTypes.STRING(100), */

            
    
        };
    
        let config = {
            tableName: 'product',
            timestamps: false,
             
    
        };
    
    
     const Product = sequelize.define(alias,cols,config);
    
    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    
    Product.associate = function (models) {
        Product.belongsTo(models.Category, { 
                as: "category",
                foreignKey: "id_category"
            }),

            Product.hasMany(models.Cart, { 
                as: "cart",
                foreignKey: "id_product"
            })
    
    
        }
    
    
        return Product
    }