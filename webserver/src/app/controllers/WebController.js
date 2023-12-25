const Turbine = require("../models/Turbine");
const Data = require("../models/Data");
var momentTimezone = require("moment-timezone");
const moment = require("moment");

const {
  multipleMongooseToObject,
  singleMongooseToObject,
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
      const turbine = await Turbine.findOne({ _id: req.params._id }).exec();
      // const datas = await Data.find({ turbine_id: req.params._id }).exec();

      // // gộp các trường về thành một mảng và lọc các trường không cần thiết
      // const filteredDatas = {};
      // multipleMongooseToObject(datas).forEach((item) => {
      //   Object.keys(item).forEach((key) => {
      //     if (key !== "turbine_id" && key !== "__v" && key !== "_id") {
      //       if (!filteredDatas[key]) {
      //         filteredDatas[key] = [];
      //       }
      //       filteredDatas[key].push(item[key]);
      //     }
      //   });
      // });

      const endDate = moment().utc().endOf("day"); // Lấy thời điểm cuối ngày hôm nay ở UTC
      const startDate = moment().utc().subtract(6, "days").startOf("day"); // Lấy thời điểm đầu ngày của 7 ngày trước ở UTC
      const arrDate = Array.from({ length: 8 }, (_, i) =>
        startDate.clone().add(i, "days").toDate()
      );

      var datas = await Data.aggregate([
        {
          $match: {
            turbine_id: req.params._id,
            timestamp: {
              $gte: new Date(startDate),
              $lt: new Date(endDate),
            },
          },
        },
        {
          $bucket: {
            groupBy: "$timestamp",
            boundaries: arrDate,
            default: "Other",
            output: {
              // Sử dụng $push để thêm các giá trị vào một mảng
              engineTemperature: { $push: "$engineTemperature" },
              pressure: { $push: "$pressure" },
              wind_speed: { $push: "$wind_speed" },
              power_output: { $push: "$power_output" },
              timestamp: { $push: "$timestamp" },
              avg_temperature: { $avg: "$engineTemperature" },
              avg_pressure: { $avg: "$pressure" },
              avg_wind_speed: { $avg: "$wind_speed" },
              avg_power_output: { $avg: "$power_output" },
            },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            engineTemperature: 1,
            pressure: 1,
            wind_speed: 1,
            power_output: 1,
            timestamp: 1,
            avg_temperature: 1,
            avg_pressure: 1,
            avg_wind_speed: 1,
            avg_power_output: 1,
          },
        },
      ]);
      //chuyển sang định dạng giờ phút
      datas.forEach((data) => {
        data.timestamp = data.timestamp.map(function (utc) {
          var utcMoment = moment(utc, "YYYY-MM-DDTHH:mm:ss.SSSZ");
          return utcMoment.format("HH:mm");
        });
        data.date = moment(data.date, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
          "DD/MM/YYYY"
        );
      });
      console.log(datas);
      res.render("pages/dashboard", {
        datas: datas,
        turbine: singleMongooseToObject(turbine),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new EMQXController();
