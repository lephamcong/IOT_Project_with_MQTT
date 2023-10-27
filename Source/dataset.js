const  numClients = require("./index");
// Hàm để tạo một đối tượng thông tin ngẫu nhiên cho mỗi client
function createRandomClientData(clientID) {
  const temperature = (Math.random() * 10 + 30).toFixed(1); // Nhiệt độ ngẫu nhiên từ 10 đến 40 độ C
  const humidity = (Math.random() * 20 + 60).toFixed(1); // Độ ẩm ngẫu nhiên từ 60% đến 80%
  const windSpeed = (Math.random() * 20 + 5).toFixed(1); // Tốc độ gió ngẫu nhiên từ 5 m/s đến 25 m/s
  const operatingCapacity = (Math.random() * 10 + 80).toFixed(1); // Dung lượng hoạt động từ 80% đến 90%

  return {
    clientID,
    temperature,
    humidity,
    windSpeed,
    operatingCapacity,
  };
}
function initClientData(clientID) {
  const client = createRandomClientData(clientID);
  //thêm thuộc tính Status 100% là đang hoạt động
  client.operatingStatus1 = "Running";
  client.operatingStatus2 = "Running";
  return client;
}
// Tạo mảng ClientDatas với 500 phần tử
const ClientDatas = Array.from({ length: numClients }, (_, index) =>
  initClientData(`stations${(index + 1).toString().padStart(2, "0")}`)
);

// Hàm để cập nhật thông tin cho tất cả các client sau mỗi 10 giây
function updateClientData() {
  setInterval(() => {
    ClientDatas.forEach((clientData) => {
      // Cập nhật thông tin ngẫu nhiên cho mỗi client
      Object.assign(clientData, createRandomClientData(clientData.clientID));
    });
  }, 10000); // Cập nhật sau mỗi 10 giây
}
updateClientData();
module.exports = {
  ClientDatas,
  //   OtherData,
};
// function showClientInfo(clientInfo) {
//   console.log(`Client ID: ${clientInfo.clientID}`);
//   console.log(`Temperature: ${clientInfo.temperature} °C`);
//   console.log(`Humidity: ${clientInfo.humidity} %`);
//   console.log(`Wind Speed: ${clientInfo.windSpeed} m/s`);
//   console.log(`Operating Status: ${clientInfo.operatingStatus}`);
//   console.log(`Operating Capacity: ${clientInfo.operatingCapacity} %`);
//   console.log("----------------------------------");
// }

// // Hàm để hiển thị thông tin của tất cả các client
// function showAllClientInfo() {
//   ClientsInfor.forEach((clientInfo) => {
//     showClientInfo(clientInfo);
//   });
// }
// setInterval(() => {
//   console.log("================== Client Information ==================");
//   showAllClientInfo();
// }, 10000); // In sau mỗi 10 giây
// Bắt đầu cập nhật thông tin
// console.log("abc");
