// Creating our User model
module.exports = function (sequelize, DataTypes) {
    var Decision = sequelize.define("Decision", {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Decision.associate = (models) => {
        Decision.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Decision;
};
