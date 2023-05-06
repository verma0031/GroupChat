const parentNode = document.getElementById('chat-box');
const token = localStorage.getItem('token');
const messageField = document.getElementById("message-input");
// await axios.get('http://localhost:4000/user/getMessage', {headers: {authorization: token}})

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.onload = async function() {
    try{
        let oldMessages = [];
        const res = await axios.get('http://localhost:4000/user/getOldMessages', {headers: {authorization: token}});
        for(const msg of res.data.msg) {
            addMesaageToChat(msg.message_text, msg.message_sender_name);
            oldMessages.push(msg);
        }
        localStorage.setItem("lastID", res.data.msg[res.data.msg.length-1].id);
        localStorage.setItem("oldMessages", JSON.stringify(oldMessages));
    }catch(err){
        console.log(err);
    }
};

async function getNewMessages() {
    try{
        let oldMessages = JSON.parse(localStorage.getItem("oldMessages"));
        const res = await axios.get('http://localhost:4000/user/getNewMessages', {headers: {authorization: token, lastId: localStorage.getItem("lastID")}});
        console.log("get messages", res);
        for(const msg of res.data.msg) {
            addMesaageToChat(msg.message_text, msg.message_sender_name);
            oldMessages.push(msg);
        }
        if(res.data.msg.length > 0)
        localStorage.setItem("lastID", res.data.msg[res.data.msg.length-1].id);
        localStorage.setItem("oldMessages", JSON.stringify(oldMessages));
    }catch(err){
        console.log(err);
    }
}

setInterval(getNewMessages, 1000);

async function sendMessage() {
    console.log("Called");
    try{
        const decodeToken = parseJwt(token);
        const user = decodeToken.name;
        const message = messageField.value;
        const res = await axios.post("http://localhost:4000/user/sendMessage", {message_text: message},{headers: {authorization: token, lastId: localStorage.getItem("lastID")}});
        messageField.value = "";  
    }catch(err){
        console.log(err);
    }
}

function addMesaageToChat(msg, sender){
    let createDiv = document.createElement('div');
    let msg_content = document.createElement('p');
    msg_content.textContent =`${sender}: ${msg}`;
    createDiv.appendChild(msg_content);

    parentNode.appendChild(createDiv);
}

document.getElementById('log-out').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = "/user/login.html";
})