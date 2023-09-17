const { DataTypes, Model } = require('sequelize')

module.exports = class Users extends Model {
    static init(sequelize) {
        return super.init({
            userName: { type: DataTypes.STRING },
            password: { type : DataTypes.STRING },
        }, {
            tableName: 'Users',
            updatedAt:true,
            createdAt:true,
            raw:true,
            sequelize
        })
    }
}
