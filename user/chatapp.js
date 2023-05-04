const token = localStorage.getItem('token');

async function getMessage(){
    await axios.get('http://localhost:4000/user/getMessage', {headers: {authorization: token}})
    .then( (response) => {
        console.log(response);
        clearChat()
        for(var i=0; i<response.data.msg.length; i++){
            console.log(response.data.msg[i].message_text);
            addMesaageToChat(response.data.msg[i].message_text, response.data.msg[i].message_sender_name)
        }
    })
}

getMessage();

setInterval(getMessage,1000)

function clearChat() {
    const chatMessages = document.getElementById('chat-box');
    chatMessages.innerHTML = '';
  }

const submit = document.getElementById('submit-button');
    submit.onclick = onSubmit;

    async function onSubmit(e){
        e.preventDefault();

        console.log("Submit Clicked");
        const message_text = document.getElementById('message-input').value;
    
        const msgData = {
            message_text
        }
    
        console.log(msgData);
    
        await axios.post('http://localhost:4000/user/sendMessage', msgData, {headers: {authorization: token}})
        .then( async (response) => {
            console.log("after post response", response);
        })
    }



// window.addEventListener("DOMContentLoaded", async () => {

    


    
    
    
// })


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