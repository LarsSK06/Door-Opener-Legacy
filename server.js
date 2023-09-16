// Package definitions

    const express = require("express");
    const cors = require("cors");
    const fs = require("fs");
    const cmd = require("node:child_process");
    const users = require("./users.json");



// Variables

    let encryptionKey = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
    ];
    const encryptionChars = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
    ];
    const cooldown = 10;
    let onCooldown = false;
    let refreshEncryptionKeyTimeout;



// Express app config

    const app = express();
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({extended: true}));



// Events

    app.post("/open", (request, response) => {
        console.log(request.body);
        return; //
        if(
            !body
            || !body["username"]
            || !body["password"]
        ){
            response.status(400).send({
                code: 400,
                message: "Body missing username or password",
                abbr: "bm"
            });
            return;
        }
        if(!users[body["username"].toLowerCase()]){
            response.status(400).send({
                code: 400,
                message: "User not found",
                abbr: "unf"
            });
            return;
        }
        if(!users[body["username"].toLowerCase()]["password"] != body["password"]){
            response.status(400).send({
                code: 401,
                message: "Incorrect password",
                abbr: "ip"
            });
            return;
        }
        if(onCooldown){
            response.status(408).send({
                code: 408,
                message: "On cooldown",
                abbr: "oc"
            });
            return;
        }

        // do arduino shit

        response.status(200).send({
            code: 200,
            message: "Door was opened",
            abbr: "dwo"
        });
        cmd.exec(`py main.py "${body["username"]}"`);
        console.log(`\nApproved door open request:`
            + `\n\tip:\t\t${request.ip}`
            + `\n\thost:\t\t${request.hostname}`
            + `\n\turl:\t\t${request.url}`
            + `\n\tmethod:\t\t${request.method}`
            + `\n\tuser:\t\t${body["username"]}`
        );
        onCooldown = true;
        if(refreshEncryptionKeyTimeout) clearTimeout(refreshEncryptionKeyTimeout);
        refreshEncryptionKey();
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
        refreshEncryptionKey();
    });



// Functions

    function decrypt(string){
        let result = "";
        const split = string.split("");
        split.forEach(char => {
            if(encryptionKey.includes(char)){
                result += encryptionChars[
                    encryptionKey.indexOf(char)
                ];
            }
            else result += char;
        });
        return result;
    }
    function refreshEncryptionKey(){
        let result = [];
        let arr = encryptionChars;
        for(let i = 0; i < encryptionChars.length; i++){
            const char = arr[
                Math.floor(
                    Math.random() * arr.length
                )
            ];
            result.push(char);
            arr.splice(arr.indexOf(char), 1);
        }
        return result;
    }