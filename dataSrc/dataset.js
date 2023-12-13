// const numClients = require("./index");
const { readTurbinesInformation } = require("./turbinesInformation");
let turbinesInformations;
let clientDatas;
async function startdataset() {
  try {
    turbinesInformations = await readTurbinesInformation();
    // // Tạo mảng client data
    clientDatas = Array.from({ length: 12 }, (_, index) =>
      initClientData(turbinesInformations[index]._id)
    );
    // console.log(clientDatas);
    updateClientData();
  } catch (error) {
    console.error("Error reading turbines information:", error);
  }
}
// startdataset();
// Hàm để tạo một đối tượng thông tin ngẫu nhiên cho mỗi client
function createRandomClientData(clientID) {
  const engineTemperature = (Math.random() * 10 + 30).toFixed(1); // Nhiệt độ ngẫu nhiên từ 10 đến 40 độ C
  const pressure = (Math.random() * 20 + 60).toFixed(1); // Độ ẩm ngẫu nhiên từ 60% đến 80%
  const wind_speed = (Math.random() * 20 + 5).toFixed(1); // Tốc độ gió ngẫu nhiên từ 5 m/s đến 25 m/s
  const power_output = (Math.random() * 10 + 80).toFixed(1); // Dung lượng hoạt động từ 80% đến 90%

  return {
    clientID,
    engineTemperature,
    pressure,
    wind_speed,
    power_output,
  };
}
function initClientData(clientID) {
  const client = createRandomClientData(clientID);
  // //thêm thuộc tính
  // client.operatingStatus1 = "Running";
  // client.operatingStatus2 = "Running";
  return client;
}

// // Hàm để cập nhật thông tin cho tất cả các client sau mỗi 10 giây
function updateClientData() {
  setInterval(() => {
    clientDatas.forEach((clientData) => {
      // Cập nhật thông tin ngẫu nhiên cho mỗi client
      Object.assign(clientData, createRandomClientData(clientData.clientID));
    });
  }, 10000); // Cập nhật sau mỗi 10 giây
}

module.exports = {
  getTurbinesInformations: () => turbinesInformations,
  getClientDatas: () => clientDatas,
  startdataset,
};
