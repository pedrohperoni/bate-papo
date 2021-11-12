// user log in request

let user = prompt("Qual seu nome?");
const userPromise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",{name: user})
userPromise.then(teste)
userPromise.catch(error)

function teste(resposta){
   console.log(resposta,"success");
}

function error(){
   user = prompt("Esse nome é inválido ou já está em uso, digite outro nome!")
}

// user status check (check every 5 seconds)

const userUpdatePromise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {name:user})
userUpdatePromise.catch()

function connectionLost(){
   location.reload()
   console.log("userUpdated")
}

// load messages from server (load every 3 seconds)

  const messagesPromise =  axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
  messagesPromise.then(displayMessages)
   console.log("try")

   function displayMessages(chatInfo){
      const info = chatInfo.data
      const messageList = document.querySelector("main")

      console.log(info, "console log")
   
      for(i=0;i<=info.length;i++){
         let defaultText = '';
         let receiver = '';
   
         if(info[i].type === "message"){
               defaultText = "<p>para</p>"
               receiver = `<strong>${info[i].to}</strong>`
         } else if (info[i].type === "private_message"){
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
      messageList.scrollIntoView(false)
      }
   }


// send messages to the server

function sendMessage(){

let message = document.querySelector(".inputMessage").value
console.log(message)

axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",{
   from: user,
	to: "Todos",
	text: message,
	type: "message"
})
.then(function(response){
   console.log("mensagem enviada",response)
   messagesPromise.then(displayMessages)
})
.catch(function(error){
   console.log("erro de envio",error.response)
});
}
