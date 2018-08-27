/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('provinces', {
		id: {
			type: DataTypes.INTEGER(255),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		pid: {
			type: DataTypes.INTEGER(50),
			allowNull: false
		},
		name: {
			type: DataTypes.CHAR(50),
			allowNull: false
		}
	}, {
		tableName: 'provinces',
		timestamps: false
	});
};
