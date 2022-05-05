module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // esto debería estar en singular
    
    let cols = {
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
        description: {
            type: dataTypes.STRING(200)   
        },
        image: {
            type: dataTypes.STRING(50),
            allowNull: false 
        }            
    
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
        })
    
    
    }
    
    return Product
}