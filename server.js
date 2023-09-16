// Package definitions

    const express = require("express");
    const fs = require("fs");
    const cmd = require("node:child_process");



// Variables

    let token = "";
    const tokenLength = 30;
    const tokenChars = [
        "a", "b", "c", "d", "c", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
    ]
    const cooldown = 10;
    let onCooldown = false;



// Express app config

    const app = express();
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(express.raw());



// Events

    app.put("/open", (request, response) => {
        if(onCooldown){
            response.status(408).send({
                code: 408,
                message: "Requests on cooldown"
            });
            return;
        }

        // do arduino shit

        response.status(200).send({
            code: 200,
            message: "Door was opened"
        });
        onCooldown = true;
        setTimeout(() => onCooldown = false, cooldown * 1000);
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



// Functions

    function refreshToken(){
        token = "";
        for(let i = 0; i < tokenLength; i++){
            const char = tokenChars[
                Math.floor(
                    Math.random() * tokenChars.length
                )
            ];
            if(Math.random() >= .5) token += char.toUpperCase();
            else token += char;
        }
    }