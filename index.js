const ws = require('ws');
const fs = require('fs');

const wss = new ws.Server({ port: 8081});


wss.on('connection', ws => {
    console.log("new client!!!!!");
    let thisVariable = true;
    let thisVariable2 = true;
    var username = "";

    ws.on("close", () => {
        console.log("client.disconnect" + username);
    });

    ws.on("message", data => {
        list = []
        if (thisVariable2) {
            for (var i = 0; i < data.length; i++) {
                list.push(data[i]);
            }
            username = list.join("");
            thisVariable2 = false;
            try {
                ws.send(fs.readFileSync("Usernames/" + username, {encoding:"utf8"}));
            } catch (e) {
                
            }
            console.log(username)
        }
        if (username != data) {
            fs.writeFileSync("Usernames/" + username, data)
        }
    });
});