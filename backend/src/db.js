const Sequelize = require('sequelize')


class DataBaseManger {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './backend/database.sqlite', // Replace with the path to your SQLite database file
        })
        this.sequelize.sync()
            .then(() => {
                console.log('Tables created successfully!')
            })
            .catch((error) => {
                console.error('Error creating tables:', error)
            })

    }
}

module.exports = DataBaseManger
