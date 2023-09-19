// Package definitions
const session = require('express-session')
const express = require('express')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const cors = require('cors')
const fs = require('fs')
const DataBaseManager = require('./backend/src/db')
const DBManager = new DataBaseManager
const ArduinoControl = require("./backend/arduinoConnector")
const arduino = new ArduinoControl

// Express app config

const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(cors())

app.use(session({
    secret: 'our-secret-key',
    resave: false,
    saveUninitialized: true,
    store: DBManager.store()
}))

// Events

    app.put("/s", (request, response) => {
        if(onCooldown){
            response.status(401).send({
                code: 401,
                message: "On cooldown",
                abbr: "oc",
                timeLeft: (cooldownStartEpoch + cooldown) - getEpoch()
            });
            return;
        }
        if(request.headers.authorization != process.env.auth){
            response.status(401).send({
                code: 401,
                message: "Invalid authorization header",
                abbr: "iah"
            });
            return;
        }
        if(
            !request.body
            || !request.body["password"]
        ){
            response.status(400).send({
                code: 400,
                message: "Request body missing password",
                abbr: "rbmp"
            });
            return;
        }
        response.status(200).send({
            code: 200,
            message: "Successfully received signal",
            abbr: "srs"
        });

        // arduino her
    });

    app.all("*", (request, response) => { // Fallback
        if(fs.existsSync(`./frontend${request.url}`)){
            response.status(200).sendFile(`${__dirname}/frontend${request.url}`);
            return;
        }
        response.status(404).send({
            code: 404,
            message: "Unknown request"
        });
        console.log(`\nUnknown request:`
            + `\n\tip:\t\t${request.ip}`
            + `\n\thost:\t\t${request.hostname}`
            + `\n\turl:\t\t${request.url}`
            + `\n\tmethod:\t\t${request.method}`
        );
    });

    const port = 4000;
    const session = app.listen(port, "0.0.0.0", () => {
        console.log(`API active on port ${port}!`);
    });
