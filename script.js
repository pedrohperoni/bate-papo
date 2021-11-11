// user log in request

const user = prompt("Qual seu nome?");
const userPromise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",{name: user})
userPromise.then(teste)
userPromise.catch(error)

function teste(resposta){
   console.log(resposta);
}

function error(){
   user = prompt("Esse nome é inválido ou já está em uso, digite outro nome!")
}

// user status check (check every 5 seconds)

const userUpdatePromise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {name:user})
userUpdatePromise.catch()

function connectionLost(){
   location.reload()
}

// load messages from server (load every 3 seconds)

setInterval(axios.get("https://mock-api.driven.com.br/api/v4/uol/messages").then(renderChat), 3000)


function renderChat(chatInfo){
   const info = chatInfo.data
   const messageList = document.querySelector("main")
   console.log(info)

   for(i=0;i<=info.length;i++){
      let defaultText = '';
      let receiver = '';

      if(info[i].type == "message"){
            defaultText = "<p>para</p>"
            receiver = `<strong>${info[i].to}</strong>`
      } else if (info[i].type == "private_message"){
            defaultText = "<p>reservadamente para</p>"
            receiver = `<strong>${info[i].to}</strong>`
      }

   messageList.innerHTML += 
   `         
   <div class="messageBox ${info[i].type}">
      <span>(${info[i].time})</span>
      <strong>${info[i].from}</strong>
      ${defaultText}
      ${receiver}
      <p>${info[i].text}</p>
   </div>
   `

   messageList.scrollIntoView()
   }
}


// send messages to the server
let inputMessage = document.querySelector(".sendMessage").value;



messagePromise.then(sendMessage)

function sendMessage(){
   inputMessage = document.querySelector(".sendMessage").value;
   console.log(inputMessage, user,"aseae")

}

const messagePromise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", {
   from: user,
   to: any,
   text: inputMessage,
   type: message,
})