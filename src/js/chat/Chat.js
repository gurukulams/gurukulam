class Chat {
  constructor(_parent) {
    this.parent = _parent;

    this.userName = null;

    this.messagesBoxEl = _parent.querySelector("#messages-box");

    let stompClient;

    const onMessageReceived = (payload) => {
      var message = JSON.parse(payload.body);
      console.log("Message received {}", message);
      if (message.type === "JOIN") {
        console.log("{} joined", message.sender);
      } else if (message.type === "LEAVE") {
        console.log("{} left", message.sender);
      } else {
        const messageEl = document.createElement("div");
        messageEl.classList.add("card");
        messageEl.innerHTML = `<div class="card-body">
        <p class="card-text">${message.content}</p>
      </div>`;
        this.messagesBoxEl.appendChild(messageEl);
      }
    };

    const onConnected = () => {
      // Subscribe to the Public Topic
      stompClient.subscribe("/topic/public", onMessageReceived);

      // Tell your username to the server
      stompClient.send(
        "/app/chat.addUser",
        {},
        JSON.stringify({ sender: this.userName, type: "JOIN" })
      );
    };

    const onError = (error) => {
      console.error(error);
    };

    this.parent
      .querySelector(".fa-search")
      .addEventListener("click", (event) => {
        this.userName =
          event.currentTarget.parentElement.nextElementSibling.value.trim();
        if (this.userName) {
          console.log("Connect me {}", this.userName);
          // eslint-disable-next-line no-undef
          var socket = new SockJS("/chat");
          // eslint-disable-next-line no-undef
          stompClient = Stomp.over(socket);

          stompClient.connect({}, onConnected, onError);

          event.currentTarget.parentElement.parentElement.firstElementChild.disabled = true;
        }
      });

    this.parent
      .querySelector(".fa-paper-plane")
      .addEventListener("click", (event) => {
        const messageEl =
          event.currentTarget.parentElement.parentElement.firstElementChild;
        const message = messageEl.value.trim();
        if (message) {
          if (stompClient) {
            var chatMessage = {
              sender: this.userName,
              content: message,
              type: "CHAT",
            };

            stompClient.send(
              "/app/chat.sendMessage",
              {},
              JSON.stringify(chatMessage)
            );

            messageEl.value = "";
            messageEl.focus();
          }
          event.preventDefault();
        }
      });
  }
}

export default Chat;
