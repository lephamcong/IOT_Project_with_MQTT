module.exports = {
  multipleMongooseToObject: function (mongooses) {
    return mongooses.map((mongoose) => mongoose.toObject());
  },
  singleMongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
  convertTo_id: function (object) {
    object._id = object.clientid;
    delete object.clientid;
    return object;
  },
  handleReqConnect: (object) => {
    object = module.exports.convertTo_id(object);
    object.status = object.status.replace("client.", "");
    return object;
  },
  handleReqData: (object) => {
    object = module.exports.convertTo_id(object);
    object._id = object._id + "_" + object.timestamp;
    delete object.timestamp;
    return object;
  },
};
