/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('university', {
		id: {
			type: DataTypes.INTEGER(255),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.CHAR(100),
			allowNull: false,
			unique: true
		},
		pid: {
			type: DataTypes.INTEGER(50),
			allowNull: false
		},
		city: {
			type: DataTypes.CHAR(100),
			allowNull: true
		},
		department: {
			type: DataTypes.CHAR(100),
			allowNull: true
		},
		uniqueid: {
			type: DataTypes.CHAR(255),
			allowNull: true
		},
		level: {
			type: DataTypes.CHAR(50),
			allowNull: true
		},
		usercount: {
			type: DataTypes.INTEGER(255),
			allowNull: true
		}
	}, {
		tableName: 'university',
		timestamps: false
	});
};
