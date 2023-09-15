// Package definitions

    const express = require("express");
    const fs = require("fs");
    const cmd = require("node:child_process");



// Variables

    let canExecute = true;
    const cooldown = 20;



// Express app config

    const app = express();
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(express.raw());



// Events

    app.all("*", (request, response) => { // Fallback
        if(fs.existsSync(`./frontend${request.url}`)){
            response.status(200).sendFile(`${__dirname}/frontend${request.url}`);
            return;
        }
        response.status(404).send({
            code: 404,
            message: "Unknown request"
        });
        console.log(`Unknown request:`
            + `\n\tip:\t\t${request.ip}`
            + `\n\thost:\t\t${request.hostname}`
            + `\n\turl:\t\t${request.url}`
            + `\n\tmethod:\t\t${request.method}`
        );
    });

    const port = 4000;
    app.listen(port, "0.0.0.0", () => {
        console.log(`API active on port ${port}!`);
    });