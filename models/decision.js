// Creating our User model
module.exports = (sequelize, DataTypes) => {
    //Creates a Decision table with columns description and underscores the id.
    var Decision = sequelize.define("Decision", {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            classMethods: {
                associate: (models) => {
                    Decision.belongsTo(models.User);
                    Decision.hasMany(models.Choice);
                }
            },
            underscored: true
        }
    );

    Decision.associate = (models) => {
        Decision.belongsTo(models.User);
        Decision.hasMany(models.Choice, { onDelete: 'CASCADE' });
        Decision.hasMany(models.Tag);
        Decision.hasMany(models.Vote, { onDelete: 'CASCADE' });
        Decision.hasMany(models.Comment, { onDelete: 'CASCADE' });
    };

    return Decision;
};
