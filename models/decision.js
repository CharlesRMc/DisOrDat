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
<<<<<<< HEAD
        Decision.hasMany(models.Choice, { onDelete: 'CASCADE' });
=======

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
>>>>>>> 64fe39bdd07f80e426c88289612e00479705fb42
        Decision.hasMany(models.Tag);
        Decision.hasMany(models.Vote, { onDelete: 'CASCADE' });
        Decision.hasMany(models.Comment, { onDelete: 'CASCADE' });
    };

    return Decision;
};
