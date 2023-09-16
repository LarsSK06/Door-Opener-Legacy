const ip = "127.0.0.1:4000";

window.addEventListener("load", async () => {
    document.querySelector("#container").querySelector("#submit").addEventListener("click", async () => {
        const username = document.querySelector("#container").querySelector("#username").value;
        const password = document.querySelector("#container").querySelector("#password").value;
        if(username == null || username == ""){
            log("Username field cannot be empty!");
            return;
        }
        const response = await fetch(
            `http://${ip}/open`,
            {
                method: "POST",
                mode: "no-cors",
                body: {
                    username: "username",
                    password: "password"
                },
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": 1000,
                    "Host": "127.0.0.1:4000"
                }
            }
        );
        console.log(await response["abbr"]);
        // switch(await response["abbr"]){
        //     case "": {
                
        //     }
        //     break;
        // }
    });
    function log(message){
        const logField = document.querySelector("#container").querySelector("#log");
        logField.innerHTML = message;
        logField.style.opacity = 1;
        setTimeout(() => logField.style.opacity = 0, 2500);
    }
});