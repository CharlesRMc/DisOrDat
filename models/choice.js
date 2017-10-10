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
	},
		{
			//instead of camel case will outout user_id
			underscored: true
		}
	);
	//saying that the choices are subclasses of the Decision model
	Choice.associate = (models) => {
		Choice.belongsTo(models.Decision, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Choice;
};
