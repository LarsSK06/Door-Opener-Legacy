const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const Users = require('../models/Users')

class DataBaseManager {
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
    async createAccount(userName, password) {
        const saltRounds = 10
        console.log(userName, password)
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                // Handle error
                // Probably add some kind of logging system to files later
                return 'Account NOT created!'
            } else {
                // Store the hashed password in database
                Users.create({
                    name: userName,
                    password: hash
                })
                return 'Account created!'
            }
        })
    }
    async login(userName, password) {
        bcrypt.compare(password, await Users.findOne({ where: { name:userName } }), (err, result) => {
            if (err) {
                // Handle error
                // Probably add some kind of logging system to files later
            } else if (result) {
                // Passwords match, proceed with authentication
                console.log('Authentication successful')
                return 'Logged in!'
            } else {
                // Passwords don't match, authentication failed
                console.log('Authentication failed')
                return 'NOT logged in!'
            }
        }) 
    }     
}


module.exports = DataBaseManager
