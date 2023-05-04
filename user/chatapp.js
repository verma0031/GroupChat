
async function sendMessage(e){
    e.preventDefault();
    console.log("Submit Clicked");
    const token = localStorage.getItem('token');
    const message_text = document.getElementById('message-input').value;

    const msgData = {
        message_text
    }

    console.log(msgData);

    await axios.post('http://localhost:4000/user/sendMessage', msgData, {headers: {authorization: token}})
    .then( (response) => {
        console.log("after post response", response);
        console.log("after post request",response.data.messageInfo.message_text);
        addMesaageToChat(response.data.messageInfo.message_text, response.data.messageInfo.message_sender_name);
    })


}

function addMesaageToChat(msg, sender){
    let parentNode = document.getElementById('chat-box');
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