module.exports = (sequelize, dataTypes) => {
    let alias = 'Category'; // esto debería estar en singular
    
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
        }
    };
    
    let config = {
        tableName: 'category',
        timestamps: false,
            
    };
    
    const Category = sequelize.define(alias,cols,config);
    
    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    
    Category.associate = function (models) {
        Category.hasMany(models.Product, { 
                as: "products",
                foreignKey: "id_category"
                
        })      
    }
    
    return Category
}