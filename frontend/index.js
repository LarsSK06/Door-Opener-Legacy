const ip = "127.0.0.1:4000";

window.addEventListener("load", async () => {
    {
        const container = document.querySelector("#container");
        container.querySelector("#submit").addEventListener("click", async () => {
            const username = document.querySelector("#container").querySelector("#username").value;
            const password = document.querySelector("#container").querySelector("#password").value;
            if(username == null || username == ""){
                log("Username field cannot be empty!");
                return;
            }
            const response = await fetch(`http://${ip}/s`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "just-for-security-idfk"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const data = await response.json();
            console.log(data);
            switch(data["abbr"]){
                case "iah":
                    log(response.status + ": Invalid authorization header");
                    break;
                case "buopm":
                    log(response.status + ": Request body missing username or password");
                    break;
                case "uopi":
                    log(response.status + ": Username or password incorrect");
                    break;
                case "srs":
                    log(response.status + ": Successfully received signal");
                    break;
            }
        });
    }
    function log(message){
        const logField = document.querySelector("#container").querySelector("#log");
        logField.innerHTML = message;
        logField.style.opacity = 1;
        setTimeout(() => logField.style.opacity = 0, 2500);
    }
});