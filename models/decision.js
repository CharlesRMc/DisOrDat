// Creating our User model
module.exports = function (sequelize, DataTypes) {
    //Creates a Decision table with columns description and underscores the id.
    var Decision = sequelize.define("Decision", {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            classMethods: {
                associate: function (models) {
                    Decision.belongsTo(models.User);
                    Decision.hasMany(models.Choice);
                }
            },
            underscored: true
        }
    );

    Decision.associate = function(models) {
        Decision.belongsTo(models.User);

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
        Decision.hasMany(models.Tag);
        Decision.hasMany(models.Vote);
        Decision.hasMany(models.Comment);
    };

    return Decision;
};
