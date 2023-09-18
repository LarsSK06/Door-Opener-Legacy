const { DataTypes, Model } = require('sequelize')

module.exports = class Users extends Model {
    static init(sequelize) {
        return super.init({
            name: { type: DataTypes.STRING, primaryKey:true },
            password: { type : DataTypes.STRING },
            enabled: { type : DataTypes.BOOLEAN }
        }, {
            tableName: 'Users',
            updatedAt:true,
            createdAt:true,
            sequelize
        })
    }
}
