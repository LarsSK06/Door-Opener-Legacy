const Sequelize = require('sequelize')
const session = require('express-session')
const bcrypt = require('bcrypt')
const Users = require('../models/Users')
const ButtonClick = require('../models/ButtonClick')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
class DataBaseManager {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './backend/database.sqlite', // Replace with the path to your SQLite database file
        })
        this.initTables()
        this.sequelize.sync()
            .then(() => {
                console.log('Tables created successfully!')
            })
            .catch((error) => {
                console.error('Error creating tables:', error)
            })
        this.sessionStore = new SequelizeStore({
            db: this.sequelize,
            tableName: 'sessions'
        })
        this.sessionStore.sync()
        console.log()
    }
    async createAccount(userName, password) {
        const saltRounds = 10
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
        bcrypt.compare(password, await (await Users.findOne({ where: { name:userName } })).password, (err, result) => {
            if (err) {
                // Handle error
                // Probably add some kind of logging system to files later
                console.log(err)
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
    store() {
        return new SequelizeStore({
            db: this.sequelize,
            expiration: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
            checkExpirationInterval: 15 * 60 * 1000, // Interval to check and remove expired sessions (in milliseconds)
            extendDefaultFields: (defaults, session) => ({
                data: defaults.data,
                expires: defaults.expires,
                userId: session.userId, // Store user ID along with session data
            }),
        })
    }
    getSession() {
        this.sessionStore.findOne({ where: { sid: 'WosH0vYUwquHduxMW4txJ5r0-smjys3D' } })
    }
    initTables() {
        Users.init(this.sequelize)
        ButtonClick.init(this.sequelize)
    }  
}


module.exports = DataBaseManager
