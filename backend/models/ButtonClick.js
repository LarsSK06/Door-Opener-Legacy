const { DataTypes, Model } = require('sequelize')

module.exports = class ButtonClick extends Model {
    static init(sequelize) {
        return super.init({
            userName: { // Uses Users table to create this aka needs to be a user to click a button
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'userName'
                }
            },
            success: { type: DataTypes.BOOLEAN }, // I want to see if someone is spamming buttons or not
        }, {
            tableName: 'ButtonClick',
            updatedAt: false,
            createdAt: true, // Logs when created and by who
            raw: true,
            sequelize
        })
    }
}
