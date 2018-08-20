/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('city', {
		city: {
			type: DataTypes.CHAR(50),
			allowNull: false
		},
		pid: {
			type: DataTypes.INTEGER(50),
			allowNull: false
		},
		id: {
			type: DataTypes.INTEGER(255),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		}
	}, {
		tableName: 'city',
		timestamps: false
	});
};
