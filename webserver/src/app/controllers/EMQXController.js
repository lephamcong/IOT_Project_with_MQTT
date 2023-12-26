const Turbine = require("../models/Turbine");
const Data = require("../models/Data");
const {
  handleReqConnect,
  convertTo_id,
  handleReqData,
  handleTimestamp,
} = require("../../util/mongoose");
class EMQXController {
  //[PUT] /emqx/clientData
  async clientData(req, res) {
    // console.log(req.body);
    try {
      // const _id = req.body.clientid;
      const message = handleTimestamp(handleReqData(req.body));
      await Data.insertMany([message]); // đẩy dữ liệu vào datas collection
      // await Turbine.updateOne({ _id: _id }, { $push: { datas: message._id } }); // cầm cái _id của datas collection ném vào mảng datas để lưu trữ các document data liên quan
    } catch (error) {
      console.log(error);
    }
  }
  //[POST] /emqx/connectStatus
  async connectStatus(req, res) {
    try {
      const message = handleReqConnect(req.body); // xử lý lại request cho chuẩn (VD: { status: 'disconnected', _id: 'QN001' })
      const findResult = await Turbine.findById(message._id).exec();
      if (findResult != null)
        await Turbine.updateOne({ _id: message._id }, message);
      else await Turbine.create(message);
      // res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
  //[POST] /emqx/init
  async init(req, res) {
    try {
      const message = convertTo_id(req.body); // xử lí lại thành _id
      // có thay đổi 1 chút ở Model, maintenanceHistory ko truyền lên từ Src nữa
      // mà sẽ được nhập từ web, nên cần xóa trường maintenanceHistory
      // ở tin nhắn truyền lên, để tránh bị lỗi
      delete message.maintenanceHistory;
      await Turbine.updateOne({ _id: message._id }, message);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new EMQXController();
