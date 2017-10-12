// Creating our User model
module.exports = (sequelize, DataTypes) => {
	var Comment = sequelize.define("Comment", {
		text: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
			underscored: true
		}
	);

	Comment.associate = (models) => {
		Comment.belongsTo(models.Decision, { onDelete: 'CASCADE' });
		Comment.belongsTo(models.User, { onDelete: 'CASCADE' });
	};

	return Comment;
};