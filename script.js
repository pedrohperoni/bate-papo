axios.get("https://mock-api.driven.com.br/api/v4/uol/messages").then(renderChat)


function renderChat(chatInfo){
   const info = chatInfo.data
   const messageList = document.querySelector("main")
   console.log(info)

   for(i=0;i<=info.length;i++){
      let defaultText = "";
      let receiver = "";

      if(info[i].type == "message"){
            defaultText = "para"
            receiver = info[i].to
      } else if (info[i].type == "private_message"){
            defaultText = "reservadamente para"
            receiver = info[i].to
      }


   messageList.innerHTML += 
   `         
   <div class="messageBox ${info[i].type}">
      <span>${info[i].time}</span>
      <strong>${info[i].from}</strong>
      <p>${defaultText}</p>
      <strong>${receiver}</strong>
      <p>${info[i].text}</p>
   </div>
   `

   messageList.scrollIntoView()
   }
}
