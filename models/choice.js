// Creating our User model
module.exports = function (sequelize, DataTypes) {
	// creating model Choice
	var Choice = sequelize.define("Choice", {
		//creating text object
		text: {
			type: DataTypes.STRING,
			allowNull: false
		},
		//creating optional photo inout
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