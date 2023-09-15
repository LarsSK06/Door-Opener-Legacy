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



// Listeners

    app.all("*", (request, response) => { // Fallback
        response.status(404).send({
            code: 404,
            message: "Unknown request"
        });
    });

    const port = 4000;
    app.listen(port, "0.0.0.0", () => {
        console.log(`API active on port ${port}!`);
    });