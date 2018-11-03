document.getElementById("send-button").addEventListener("click", savemessage);
var elementID = getCookie();

updateMessages("http://localhost:3000/messages");

function writeMessages(messagedata) {
    for (var i = 0; i < messagedata.length; i++) {
        document.getElementById("messages-div").innerHTML += "<div class='messages-div__messages'><div class='messages__message-pic-div'><img src='resources/science.png' alt='profile picture' class='message-pic-div__pic'></div><div class='messages__message-text-div'><div class='message-text-div__text'>" + messagedata[i].text + "</div><div class='messages-div__time'>" + messagedata[i].time + "</div></div></div>";
    }
}

function updateLastMessage(messagedata) {
    document.getElementById("messages-div").innerHTML += "<div class='messages-div__messages'><div class='messages__message-pic-div'><img src='resources/science.png' alt='profile picture' class='message-pic-div__pic'></div><div class='messages__message-text-div'><div class='message-text-div__text'>" + messagedata.text + "</div><div class='messages-div__time'>" + messagedata.time + "</div></div></div>";
}

function saveCookie(lastID) {
    document.cookie = "lastID=" + lastID + ";";
}

function getCookie() {
    var cookie = document.cookie;
    if (cookie === "") {
        saveCookie(1);
        return 1;
    }
    var lastID = cookie.split("=")[1];
    return lastID;
}

function savemessage() {
    var text = document.getElementById("message-text").value;
    var date = new Date();
    if (!(text === "")) {
        var data = {
            id: elementID++,
            text: text,
            time: date.getHours() + ":" + date.getMinutes()
        };
        postData("http://localhost:3000/messages", data)
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }
    saveCookie(elementID);
    updateLastMessage(data);
    document.getElementById("message-text").value = "";
    var objDiv = document.getElementById("messages-div");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function postData(url, data) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    }).then(response => console.log(response));
}

function updateMessages(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            writeMessages(myJson);
        });
}