const Pingerchips = require("pingerchips-js");
const crypto = require("crypto");

let client = new Pingerchips("YOUR PINGERCHIPS KEY", {
  forceTLS: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  cluster: "mt1"
});

const clientId = crypto.randomUUID();


console.log("client Id >> ", clientId);
let counter = 0;

// subcribe to channel on which users are listening 
const channel = client.subscribe("graph-data")


// function to generate random integer value
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// sending mock data every second to subscribed channel
setInterval(() => {

  channel.trigger("client-message", {
    value: getRandomInt(1, 100),
    counter: counter++
  })
  console.log("Counter >> ", counter)
}, 1000)


