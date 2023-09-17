// Package definitions

    const express = require("express");
    const cors = require("cors");
    const fs = require("fs");
    const cmd = require("node:child_process");
    const users = require("./users.json");



// Express app config

    const app = express();
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(cors());



// Events

    app.put("/s", (request, response) => {
        if(request.headers.authorization != "just-for-security-idfk"){
            response.status(401).send({
                code: 401,
                message: "Invalid authorization header",
                abbr: "iah"
            });
            return;
        }
        if(
            !request.body
            || !request.body["username"]
            || !request.body["password"]
        ){
            response.status(400).send({
                code: 400,
                message: "Request body missing username or password",
                abbr: "buopm"
            });
            return;
        }
        if(!users[request.body["username"]]){
            response.status(404).send({
                code: 404,
                message: "Username or password incorrect",
                abbr: "uopi"
            });
            return;
        }
        if(users[request.body["username"]]["password"] != request.body["password"]){
            response.status(404).send({
                code: 404,
                message: "Username or password incorrect",
                abbr: "uopi"
            });
            return;
        }
        response.status(200).send({
            code: 200,
            message: "Successfully received signal",
            abbr: "srs"
        });
        cmd.exec(`py main.py "${request.body["username"]}"`);

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