// Creating our User model
module.exports = (sequelize, DataTypes) => {
	var Tag = sequelize.define("Tag", {
		tag_name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
			underscored: true
		}
	);

	Tag.associate = (models) => {
		Tag.belongsToMany(models.Decision, {through: 'decision_id'});
	};

	return Tag;
};