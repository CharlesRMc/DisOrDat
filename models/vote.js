// Creating our User model
module.exports = (sequelize, DataTypes) => {
	var Vote = sequelize.define("Vote", {
		neither: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			// unique: true
		}
	}, {
			underscored: true
		}
	);

	Vote.associate = (models) => {
		Vote.belongsTo(models.Choice);
		Vote.belongsTo(models.User);
		Vote.belongsTo(models.Decision);
	};

	return Vote;
};