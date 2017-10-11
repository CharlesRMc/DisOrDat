// Creating our User model
module.exports = function (sequelize, DataTypes) {
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
        Decision.hasMany(models.Choice);
        Decision.hasMany(models.Tag);
        Decision.hasMany(models.Vote);
        Decision.hasMany(models.Comment);
    };

    return Decision;
};
