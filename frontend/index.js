const ip = '127.0.0.1:4000' // Must be changed to server computer static IP

window.addEventListener('load', async () => {
    {
        const container = document.querySelector("#container");
        container.querySelector("#submit").addEventListener("click", async () => {
            const password = document.querySelector("#container").querySelector("#password").value;
            const response = await fetch(`http://${ip}/s`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'just-for-security-idfk'
                },
                body: JSON.stringify({
                    password: password
                })
            })
            const data = await response.json();
            console.log(data);
            switch(data["abbr"]){
                case "oc":
                    log(response.status + `: On cooldown (${cutDecimals(data["timeLeft"], 1)}s left)`);
                    break;
                case "iah":
                    log(response.status + ": Invalid authorization header");
                    break;
                case "rbmp":
                    log(response.status + ": Request body missing password");
                    break;
                case "srs":
                    log(response.status + ": Successfully received signal");
                    break;
            }
        })
    }
    {
        let onCooldown = false
        function log(message) {
            if (onCooldown) return
            onCooldown = true
            const logField = document.querySelector('#container').querySelector('#log')
            logField.innerHTML = message
            logField.style.opacity = 1
            setTimeout(() => logField.style.opacity = 0, 2500)
            setTimeout(() => onCooldown = false, 3000)
        }
    }
    function cutDecimals(num, dec){
        const multiplier = 10 ** dec;
        return Math.floor(num * multiplier) / multiplier;
    }
})