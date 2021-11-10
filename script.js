getChatMessages()

function getChatMessages(){
   axios.get("https://mock-api.driven.com.br/api/v4/uol/messages").then(renderChat)
}

function renderChat(chatInfo){
   const x = chatInfo.data
   const messageList = document.querySelector("main")
   console.log(x)

   for(i=0;i<=x.length;i++){
   messageList.innerHTML += 
   ` <div class="message status">
      <p><span>(${x[i].time})</span><strong>${x[i].from}</strong>entra na sala...</p>
   </div>`
   }
}
