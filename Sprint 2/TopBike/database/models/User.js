module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; // esto debería estar en singular
    
    let cols = {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                    
            },
    
            name: {
                type: dataTypes.STRING(50),
                allowNull: false
            },

            email: {
                type: dataTypes.STRING(50),
                unique: true,
                allowNull: false

            },

            password: {
                type: dataTypes.STRING(50),
                allowNull: false
            },

            picture:{
                type: dataTypes.STRING(50),
                allowNull: false
            }

        };
    
        let config = {
            tableName: 'user',
            timestamps: false,
            
    
        };
    
    
     const User = sequelize.define(alias,cols,config);
    
    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    
    User.associate = function (models) {
        User.belongsTo(models.Cart, { 
                as: "userCart",
                foreignKey: "id_user"
            })
    
    
        }
    
    
  
        return User
    }