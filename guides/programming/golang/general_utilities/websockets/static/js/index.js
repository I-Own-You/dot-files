const conInfo = document.querySelector(".conInfo")
const msgData = document.querySelector(".msgData") 

let sockett

function sendMessage() {
    if (sockett) {
        //@ts-ignore
        sockett.send(msgData.value)
    }
}

function closeConnection() {
    if (sockett) {
        sockett.close()
    }
}

function openConnection() {
    // Create WebSocket connection.
    const socket = new WebSocket("ws://localhost:3000/ws");
    sockett = socket

    // Connection opened
    sockett.addEventListener("open", (_) => {
        if (conInfo.classList.contains("conClosed") || conInfo.classList.contains("conInfo")) {
            conInfo.classList.remove("conClosed")
            conInfo.classList.add("conOpen")
            conInfo.textContent = "connection opened"
        } 
    });

    // websocket close event
    sockett.addEventListener("close", (_) => {
        console.log(1)
        if (conInfo.classList.contains("conOpen") || conInfo.classList.contains("conData")) {
            conInfo.classList.remove("conOpen")
            conInfo.classList.remove("conData")
            conInfo.classList.add("conClosed")
            conInfo.textContent = "connection closed"
        } 
    })

    // websocket error event
    sockett.addEventListener("error", (event) => {
        if (conInfo.classList.contains("conOpen") || coninfo.classList.contains("conClosed")) {
            conInfo.classList.remove("conOpen")
            conInfo.classList.add("conClosed")
            conInfo.textContent = `error: connection closed because of: ${event}`
        } 
    })

    // Listen for messages
    sockett.addEventListener("message", (event) => {
        conInfo.textContent = `you received a message: ${event.data}`

        if (conInfo.classList.contains("conOpen")) {
            conInfo.classList.remove("conData")
            conInfo.classList.remove("conOpen")
            conInfo.classList.add("conData")
        } 
    });
}
