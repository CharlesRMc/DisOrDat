// Creating our User model
module.exports = function (sequelize, DataTypes) {
	var Choice = sequelize.define("Choice", {
		text: {
			type: DataTypes.STRING,
			allowNull: false
		},
		photo: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
			underscored: true
		}
	);

	Choice.associate = function(models) {
		Choice.belongsTo(models.Decision);
		Choice.hasMany(models.Vote, { onDelete: 'CASCADE' });
	};

	return Choice;
};