/*
* set message scroll always bottom
*/
let chatHistory = document.getElementById('messages-messageArea');
chatHistory.scrollTop = chatHistory.scrollHeight;



/*
* send message on enter
*/
var input = document.getElementById("textarea");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("sendBtn").click();
  }
});