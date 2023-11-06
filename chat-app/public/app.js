const pusher = new Pusher("PINGERCHIPS KEY", {
  forceTLS: false,
  cluster: "mt1",
});

const messageInput = document.getElementById("message");
const messagesDiv = document.getElementById("messages");

// Subscribe to a Channel
// In this case it is analogous to group chat room, or personal chat room for messaging
const channel = pusher.subscribe("chat");

// Add an event listner which will trigger sendMessage function on click of send button
document.getElementById("send").addEventListener("click", () => {
  const message = messageInput.value;
  if (message) {
    sendMessage(message);
    messageInput.value = "";
  }
});

// Function to display the message on sender's UI
function newMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.textContent = "me: " + message;
  messagesDiv.appendChild(messageElement);
}

//Function to publish message over the subscribed channel "chat" with message event "client-message"
function sendMessage(message) {
  newMessage(message);
  channel.trigger("client-message", {
    text: message,
  });
}

// Setup a listner on same channel "chat" to listen for message events named "client-message"
// Display the recieved events on UI
channel.bind("client-message", (data) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = "sender: " + data.text;
  messagesDiv.appendChild(messageElement);
});
