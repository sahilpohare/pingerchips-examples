# Building a Simple Chat App with NodeJs using Websockets

## Introduction

Websockets are a powerful tool for building real-time applications. They enable the server and client to communicate with each other in real time by establishing a persistent connection between the two. This allows the server to send data to the client without the client having to request it.

You can use libraries like Socket.io to implement websockets in your applications. However, Socket.io is not the only option. There are other libraries that can be used to implement websockets in your applications. But in production, it is very hard to maintain and scale the websockets. You need to manage the servers, load balancers along with maintaining state of the connections and having communication between the servers.

PingerChips is a hosted service that allows you to easily add real-time functionality to your applications. There are other providers like Pusher that provide similar services.

We will build a basic chat app that demonstrates how to send and receive messages in real time.
In this tutorial, we will create a simple real-time chat application with NodeJs using PingerChips and Pusher.

## Step 1: Create a New Node.js Project\*\*

In your terminal, create a new Node.js project and navigate to the project directory:

```bash
mkdir simple-chat-app
cd simple-chat-app
npm init -y
```

## Step 2: Install Required Dependencies\*\*

You need to install the necessary libraries: Express, Pusher

```bash
npm install express pusher
```

## Step 3: Set Up PingerChips Account\*\*

1. Go to the [PingerChips website](https://pingerchips.com) and sign up for a free account.

    ![c](https://cdn.hashnode.com/res/hashnode/image/upload/v1698659114186/293512be-5259-47e6-be16-1f92ec1de77a.png align="center")

2. Create a new app in your PingerChips dashboard to get your API credentials (App ID, Key, Secret).

    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1698659081186/1300d5e5-56b5-41b2-b03b-4068fe4215ed.png align="center")

3. Take note of your app's credentials (App ID, Key, Secret).

    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1698659152195/dc57664c-1191-4c6e-88ff-bd5ee86ece2d.png align="center")

> **_NOTE:_** Make sure client messages are enabled.

## Step 4: Create the Express Server (server.js)\*\*

Create a file named `server.js` and set up your Express server:

```javascript
const express = require("express");
const app = express();
const http = require("http").createServer(app);

app.use(express.static("public"));

http.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
```

## Step 5: Create the HTML and JavaScript for the Chat Interface (public/index.html)\*\*

Create an `index.html` file inside a `public` folder to serve as the chat interface:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Simple Chat App</title>
    </head>
    <body>
        <div id="chat">
            <div id="messages"></div>
            <input type="text" id="message" placeholder="Enter your message" />
            <button id="send">Send</button>
        </div>
        <script src="https://unpkg.com/pingerchips-js@1.0.1-a/dist/web/pingerchips.min.js"></script>
        <script src="app.js"></script>
    </body>
</html>
```

## Step 6: Create the Chat Logic (public/app.js)\*\*

Create an `app.js` file inside the `public` folder to handle the chat logic:

```javascript
const pingerchips = new Pingerchips("<YOUR APP KEY>", {
    forceTLS: false,
    cluster: "mt1",
});

const messageInput = document.getElementById("message");
const messagesDiv = document.getElementById("messages");

// Subscribe to a Channel
// In this case it is analogous to group chat room, or personal chat room for messaging
const channel = pingerchips.subscribe("chat");

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
```

## Step 7: Start the Server\*\*

In your terminal, run the following command to start the Node.js server:

```bash
node server.js
```

Your chat app should now be accessible at [http://localhost:3000](http://localhost:3000).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1698659722375/65ce90c8-0884-4ac9-aebd-75e5bb83e38e.png align="center")

That's it! You've created a simple chat app using Node.js and PingerChips. Users can send and receive messages in realtime using PingerChips. Customize and expand the functionality as needed for your application. If you encounter any issues, make sure to check your app credentials and verify that you've followed each step correctly.
