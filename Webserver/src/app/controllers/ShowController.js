const Turbine = require("../models/Turbine");
const Data = require("../models/Data");
const {
  multipleMongooseToObject,
  handleReqConnect,
  convertTo_id,
  handleReqData,
} = require("../../util/mongoose");
class EMQXController {
  //[GET] /show/
  async home(req, res) {
    try {
      // const turbine = await Turbine.findOne({ _id: req.params.slug }).exec(); // tìm trong turbines collection có document nào khớp _id (_id được lấy từ URL, VD: http://localhost:9000/show/QN001 => _id : QN001)
      // const datas = await Data.find({ _id: { $in: turbine.datas } }).exec(); // tìm trong datas collection các document có _id  nằm trong mảng datas vừa tìm được
      res.render("home");
      // console.log(datas);
    } catch (error) {
      console.log(error);
    }
  }
  async contact(req, res) {
    try {
      res.render("contact");
    } catch (error) {
      console.log(error);
    }
  }
  async dashboard(req, res) {
    try {
      res.render("dashboard");
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new EMQXController();
