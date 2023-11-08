const Turbine = require("../models/Turbine");
const Data = require("../models/Data");
const {
  multipleMongooseToObject,
  handleReqConnect,
  convertTo_id,
  handleReqData,
} = require("../../util/mongoose");
class EMQXController {
  //[PUT] /emqx/dataIncoming
  async dataIncoming(req, res) {
    try {
      const message = handleReqData(req.body); // xử lí lại data, tạo _id từ trường clientid và timestamp nhận được
      await Data.insertMany([message]);
      // console.log("Data", message);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
  //[POST] /emqx/ConnectStatus
  async ConnectStatus(req, res) {
    try {
      const message = handleReqConnect(req.body); // xử lý lại request cho chuẩn (VD: { status: 'disconnected', _id: 'QN001' })
      // console.log("Connect??", message);
      const findResult = await Turbine.findById(message._id).exec();
      if (findResult != null)
        await Turbine.updateOne({ _id: message._id }, message);
      else await Turbine.create(message);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
  //[POST] /emqx/init
  async Init(req, res) {
    try {
      const message = convertTo_id(req.body); // xử lí lại thành _id
      // console.log("Init", message);
      await Turbine.updateOne({ _id: message._id }, message);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new EMQXController();
