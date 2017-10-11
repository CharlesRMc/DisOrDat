// Creating our User model
module.exports = function (sequelize, DataTypes) {
	var Vote = sequelize.define("Vote", {}, {
			underscored: true
		}
	);

	Vote.associate = function (models) {
		Vote.belongsTo(models.Choice, {
			foreignKey: {
				allowNull: false
			}
		});
		Vote.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Vote;
};