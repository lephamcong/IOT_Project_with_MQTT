const mqtt = require("mqtt"); // thư viện mqtt
const opt = require("minimist")(process.argv.slice(2)); // thư viện dùng cho lấy arguments
// Lấy Arguments từ lệnh nhập terminal
opt.submode = opt.submode || false;
opt.message = opt.message || JSON.stringify({ msg: "Hello" });
opt.topic = opt.topic || "/mqttjs-bench";
opt.clients = opt.clients || 500;
module.exports = opt.clients;
const { ClientDatas } = require("./dataset"); //lấy dữ liệu mô phỏng bên file dataset.js

const protocol = "mqtt";
const host = "emqx@192.168.1.250";
const port = "1883";

// Array lưu giá trị các clients được trả về từ hàm connectToClients()
let clients = [];
let failedClients = 0;

// const brokerUrl = `${protocol}://${host}:${port}`; // Config link broker, nếu nó chạy trên 1 host khác chung 1 LAN
const brokerUrl = "ws://emqx@127.0.0.1:8083/mqtt"; // Config link broker, nếu nó chạy trên chính 1 host đó
// const subtopic = "/sub";
const pubtopic = "/pub";

const connectToClients = (clientID) =>
  new Promise((resolve, reject) => {
    const c = mqtt.connect(brokerUrl, {
      clientId: clientID,
    });
    c.on("connect", () => resolve(c));
    c.on("error", (err) => reject(err));
  });

const clientSubscribe = (c) => {
  //các clients sub các topic theo chính ID của nó, VD: /stations01
  const subtopic = "/" + ClientDatas[c.index].clientID;
  c.subscribe([subtopic], (err) => {});
};

const clientPublish = (c) => {
  opt.message = JSON.stringify(ClientDatas[c.index]); //lấy dữ liệu từ file dataset.js
  c.publish(pubtopic, opt.message, { qos: 0, retain: false }, (err) => {});
};

const start = async () => {
  // trying to connect to all clients before starting the test
  console.log(`\nTrying to conenct to ${opt.clients} clients ...`);
  let i = 0;
  while (clients.length < opt.clients && failedClients < opt.clients) {
    try {
      const index = clients.push(
        await connectToClients(ClientDatas[i].clientID)
      );
    } catch (err) {
      failedClients++;
    }
    i++;
  }
  if (!(failedClients < opt.clients)) {
    console.log(
      "Please check the broker address, Could not connect to clients"
    );
    process.exit(1);
  }
  console.log(`Connected to ${opt.clients} sucessfully`);
  // const action = opt.submode ? clientSubscribe : clientPublish;
  var action = clientSubscribe;
  for (let count = 2; count > 0; count--) {
    switch (action) {
      case clientPublish:
        setInterval(() => {
          for (let i = 0; i < clients.length; i++) {
            action(clients[i]);
          }
          console.log("Publish successfully!");
        }, 10000);
        break;

      case clientSubscribe:
        for (let i = 0; i < clients.length; i++) {
          clients[i].index = i; // thêm thuộc tính index cho mỗi phần tử của mảng với giá trị là index của chính nó
          action(clients[i]);
        }
        clients.forEach((client) =>
          client.on("message", (topic, payload) => {
            let objMessage = JSON.parse(payload.toString()); //chuyển payload nhận được thành string
            //update các trạng thái hoạt động khi nhận được message điều khiển.
            for (const key in objMessage) {
              if (ClientDatas[client.index].hasOwnProperty(key)) {
                ClientDatas[client.index][key] = objMessage[key];
              }
            }
            // console.log(objMessage.key);
            // console.log(client.index, objMessage);
          })
        );
        console.log("Subscribe successfully!");
        action = clientPublish;
        break;
    }
  }
};
start();

console.log("Finish");
