const conInfo1 = document.querySelector(".conInfo1")
const msgData1 = document.querySelector(".msgData1") 
const conInfo2 = document.querySelector(".conInfo2")
const msgData2 = document.querySelector(".msgData2") 

let socket1
let socket2

function sendMessage1() {
    if (socket1) {
        const userPayload = {
            userId: "user2",
            data: msgData1.value
        }
        socket1.send(JSON.stringify(userPayload))
    }
}

function closeConnection1() {
    if (socket1) {
        socket1.close()
    }
}

function openConnection1() {
    // Create WebSocket connection.
    const socket = new WebSocket("ws://localhost:3000/ws?user=user1");
    socket1 = socket

    // Connection opened
    socket1.addEventListener("open", (_) => {
        conInfo1.style.color = "green"
        conInfo1.textContent = "connection opened"
    });

    // websocket close event
    socket1.addEventListener("close", (_) => {
        console.log("user1 closed.")
        conInfo1.style.color = "red"
        conInfo1.textContent = "connection closed"
    })

    // websocket error event
    socket1.addEventListener("error", (event) => {
        conInfo1.style.color = "red"
        conInfo1.textContent = "error occured"
    })

    // Listen for messages
    socket1.addEventListener("message", (event) => {
        conInfo1.textContent = `you received a message: ${event.data}`
        conInfo1.style.color = "yellow"
    });
}

function sendMessage2() {
        const userPayload = {
            userId: "user1",
            data: msgData2.value
        }
        socket2.send(JSON.stringify(userPayload))
}

function closeConnection2() {
    if (socket2) {
        socket2.close()
    }
}

function openConnection2() {
    // Create WebSocket connection.
    const socket = new WebSocket(`ws://localhost:3000/ws?user=user2`);
    socket2 = socket

    // Connection opened
    socket2.addEventListener("open", (_) => {
        conInfo2.style.color = "green"
        conInfo2.textContent = "connection opened"
    });

    // websocket close event
    socket2.addEventListener("close", (_) => {
        console.log("user2 closed.")
        conInfo2.style.color = "red"
        conInfo2.textContent = "connection closed"
    })

    // websocket error event
    socket2.addEventListener("error", (event) => {
        console.log("user2 error.")
        conInfo2.style.color = "red"
        conInfo2.textContent = "error occured"
    })

    // Listen for messages
    socket2.addEventListener("message", (event) => {
        conInfo2.textContent = `you received a message: ${event.data}`
        conInfo2.style.color = "yellow"
    });
}
