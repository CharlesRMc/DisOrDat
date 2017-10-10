// Creating our User model
module.exports = function (sequelize, DataTypes) {
    //Creates a Decision table with columns description and underscores the id.
    var Decision = sequelize.define("Decision", {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            underscored: true
        }
    );
    //Decision belongs to a User
    Decision.associate = (models) => {
        Decision.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    //Relays that a Decsion has many choices
    Decision.associate = function (models) {
        Decision.hasMany(models.Choice);
    };

    return Decision;
};
