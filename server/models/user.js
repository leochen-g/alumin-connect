/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(255),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nickName: {
			type: DataTypes.CHAR(100),
			allowNull: false
		},
		openid: {
			type: DataTypes.CHAR(100),
			allowNull: false,
			primaryKey: true
		},
		location: {
			type: DataTypes.CHAR(50),
			allowNull: true
		},
		university: {
			type: DataTypes.CHAR(100),
			allowNull: true
		},
		pid: {
			type: DataTypes.INTEGER(50),
			allowNull: true
		},
		gender: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		avataUrl: {
			type: DataTypes.CHAR(255),
			allowNull: true
		},
		country: {
			type: DataTypes.CHAR(100),
			allowNull: true
		}
	}, {
		tableName: 'user',
		timestamps: false
	});
};
