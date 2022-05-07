module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart'; // esto debería estar en singular

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        id_product: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    };

    let config = {
        tableName: 'cart',
        timestamps: false,

    };

    const Cart = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    Cart.associate = function (models) {
        Cart.belongsTo(models.User, {
            as: "cartUser",
            foreignKey: "id_user"
        }),
        Cart.belongsTo(models.Product, {
            as: "cartProduct",
            foreignKey: "id_product"
        })

    }

    return Cart
}

