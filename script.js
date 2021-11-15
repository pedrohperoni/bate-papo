// user log in request
let user = "";
getName();
function getName(){
   user = prompt("Qual seu nome?");
   if(user !== ""){
      console.log("aaa")
      postUser()
   } else {
      getName();
   }
}

function postUser(){
   console.log("request", user)
   const userPromise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",{name: user})
   userPromise.then(getMessages)
   userPromise.then(updateUser)
   userPromise.catch(error)
}

function error(){
   user = prompt("Esse nome é inválido ou já está em uso, digite outro nome!")
}

// user status check 
function updateUser(){
   console.log("updating")
   const updatePromise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {name:user})
   updatePromise.then(keepUpdated)
   updatePromise.catch(console.log("logged out"))
   function keepUpdated(){
      axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {name:user})
      .then(console.log("asaas"))
   }
   setInterval(keepUpdated, 5000)
}
// load messages from server

function getMessages(){
   axios.get("https://mock-api.driven.com.br/api/v4/uol/messages").then(displayMessages)

   function displayMessages(chatInfo){
      const info = chatInfo.data
      let messageList = document.querySelector("main")
      messageList.innerHTML = ''

      for(i=0;i<=info.length;i++){
         let defaultText = '';
         let receiver = '';
      
         if(info[i].type === "message"){
               defaultText = "<p>para</p>"
               receiver = `<strong>${info[i].to}</strong>`
               messageList.innerHTML += `         
               <div class="messageBox ${info[i].type}" data-identifier="message">
                  <span>(${info[i].time})</span>
                  <strong>${info[i].from}</strong>
                  ${defaultText}
                  ${receiver}
                  <p>${info[i].text}</p>
               </div>
               `
         } else if (info[i].type === "status"){
            messageList.innerHTML += `         
            <div class="messageBox ${info[i].type}" data-identifier="message">
               <span>(${info[i].time})</span>
               <strong>${info[i].from}</strong>
               ${defaultText}
               ${receiver}
               <p>${info[i].text}</p>
            </div>
            `
         }
         else if (info[i].type === "private_message" && user == info[i].to){
               defaultText = "<p>reservadamente para</p>"
               receiver = `<strong>${info[i].to}</strong>`
               messageList.innerHTML += `         
               <div class="messageBox ${info[i].type}" data-identifier="message">
                  <span>(${info[i].time})</span>
                  <strong>${info[i].from}</strong>
                  ${defaultText}
                  ${receiver}
                  <p>${info[i].text}</p>
               </div>
               `
         }
      messageList.scrollIntoView(false)
      }
   }

   setInterval(updateMessages, 3000)
   
   function updateMessages(){
      axios.get("https://mock-api.driven.com.br/api/v4/uol/messages").then(displayMessages)
   }

}

// send messages to the server

function sendMessage(){

let message = document.querySelector(".inputMessage").value
console.log(document.querySelector(".inputMessage").value)

axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",{
   from: user,
	to: "Todos", 
	text: message,
	type: "message"
})
.then(getMessages)
.catch(function(error){
   console.log("erro de envio",error.response)
});
document.querySelector(".inputMessage").value = null
document.querySelector(".inputMessage").placeholder = "Escreva aqui..."
}
