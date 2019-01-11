var schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },

  photo: {
    type: String
  },

  date: {
    type: Date,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  isAvailable: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  category: {
    type: String
  },
  rating: {
    type: Number
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Brand"
  }
});

schema.plugin(deepPopulate, {
  populate: {
    'company': {
      select: " "
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model("Product", schema);

var exports = _.cloneDeep(
  require("sails-wohlig-service")(schema, "company", "company")
);



var model = {

  //AGGERATION
  // For find all product
  getAggregatePipeLine: function (data) {
    console.log(data)
    var pipeline = [{
        // Stage 1
        $lookup: {

          "from": "brands",
          "localField": "company",
          "foreignField": "_id",
          "as": "brand"
        }
      },
      // Stage 2
      {
        $unwind: {
          "path": "$brand",
        }
      }
    ];
    return pipeline;
  },
  getAllData: function (data, callback) {
    //console.log("/*//*", data)
    var pipeLine = Product.getAggregatePipeLine(data);
    Product.aggregate(pipeLine).exec(function (err, result) {
      if (err) {
        callback(err, "Mongoose Error");
      } else if (_.isEmpty(result)) {
        callback(null, "No Data Found");
      } else {
        callback(null, result);
      }
    });
  },

  //FindOne by name

  getOneAggregatePipeLine: function (data) {
    console.log(data)
    // For find all product
    var pipeline = [{
        // Stage 1
        $lookup: {

          from: "brands",
          localField: "company",
          foreignField: "_id",
          as: "brand"
        }
      },
      // Stage 2
      {
        $unwind: {
          path: "$brand",
        }
      },
      //stage3
      {
        $match: {
          name: data.name
        }
      }
    ];
    return pipeline;
  },
  getOneData: function (data, callback) {

    var pipeLine = Product.getOneAggregatePipeLine(data);
    Product.aggregate(pipeLine).exec(function (err, result) {
      if (err) {
        callback(err, null);
      } else if (_.isEmpty(result)) {
        callback(null, "No Data Found");
      } else {
        callback(null, result);
      }
    });
  },

  // For Getone by brand name
  getOneByBrandAggregatePipeLine: function (data) {
    console.log(data)
    var pipeline = [{
        // Stage 1
        $lookup: {

          from: "brands",
          localField: "company",
          foreignField: "_id",
          as: "brand"
        }
      },
      // Stage 2
      {
        $unwind: {
          path: "$brand",
        }
      },
      //stage3
      {
        $match: {
          "brand.name": data.name
        }
      }
    ];
    return pipeline;
  },
  getOneByBrand: function (data, callback) {

    var pipeLine = Product.getOneByBrandAggregatePipeLine(data);
    Product.aggregate(pipeLine).exec(function (err, result) {
      if (err) {
        callback(err, null);
      } else if (_.isEmpty(result)) {
        callback(null, "No Data Found");
      } else {
        callback(null, result);
      }
    });
  },




  // Get one by name and brandid
  getOneByNameBrandidAggregatePipeLine: function (data) {
    console.log(data)
    var pipeline = [{
        // Stage 1
        $lookup: {

          from: "brands",
          localField: "company",
          foreignField: "_id",
          as: "brand"
        }
      },
      // Stage 2
      {
        $unwind: {
          path: "$brand",
        }
      },
      //stage3
      {
        $match: {
          "name": data.name,
          "brand._id": ObjectId(data.BrandId)
        }
      }
    ];
    return pipeline;
  },
  getOneByNameBrandid: function (data, callback) {

    var pipeLine = Product.getOneByNameBrandidAggregatePipeLine(data);

    Product.aggregate(pipeLine).exec(function (err, result) {
      if (err) {
        callback(err, null);
      } else if (_.isEmpty(result)) {
        callback(null, "No Data Found");
      } else {
        callback(null, result);
      }
    });
  },



  // Get one by name and brandName
  getOneByNameBrandNameAggregatePipeLine: function (data) {
    console.log(data)
    var pipeline = [{
        // Stage 1
        $lookup: {
          from: "brands",
          localField: "company",
          foreignField: "_id",
          as: "brand"
        }
      },
      // Stage 2
      {
        $unwind: {
          path: "$brand",
        }
      },
      //Stage 3
      {
        $match: {
          "name": data.name,
          "brand.name": data.BrandName
        }
      }
    ];
    return pipeline;
  },
  getOneByNameBrandName: function (data, callback) {
    var pipeLine = Product.getOneByNameBrandNameAggregatePipeLine(data);
    console.log("PPA", pipeLine);
    Product.aggregate(pipeLine).exec(function (err, result) {
      if (err) {
        callback(err, null);
      } else if (_.isEmpty(result)) {
        callback(null, "No Data Found");
      } else {
        callback(null, result);
      }
    });
  },

  // Normal pagination
  // search: function (data, callback) {
  //   console.log("data", data)

  //   var page = 1;

  //   var maxRow = 2;
  //   if (data.page) {
  //     page = data.page;
  //   }


  //   var options = {

  //     filters: {
  //       keyword: {
  //         fields: ['name'],
  //         term: data.keyword
  //       }
  //     },
  //     sort: {
  //       asc: 'name'
  //     },
  //     start: (page - 1) * maxRow,
  //     count: maxRow
  //   };
  //   Product.find().deepPopulate('company').order(options)
  //     .keyword(options).page(options, callback);
  // },


  //Pagination by using aggeregation
  // search: function (data, callback) {
  //   var page = 1;
  //   var maxRow = 10;
  //   if (data.page) {
  //     page = data.page;
  //   }

  //   var options = {

  //     filters: {
  //       keyword: {
  //         fields: ['name'],
  //         term: data.keyword
  //       }
  //     },
  //     sort: {
  //       asc: 'name'
  //     },
  //     start: (page - 1) * maxRow,
  //     count: maxRow
  //   };
  //   var pipeLine = Product.getAggregatePipeLine(data);
  //   var newPipeLine = _.cloneDeep(pipeLine);
  //   Product.aggregate(pipeLine, function (err, matchData) {
  //     if (err) {
  //       callback(err, null);
  //     } else {
  //       newPipeLine.push({
  //         $skip: options.start
  //       }, {
  //         $limit: options.count
  //       });
  //       Product.aggregate(newPipeLine, function (err, returnReq) {
  //         if (err) {
  //           callback(err, "error in mongoose");
  //         } else {
  //           if (_.isEmpty(returnReq)) {
  //             count = 0
  //             var data = {};
  //             data.options = options;
  //             data.results = returnReq;
  //             data.total = count;
  //             callback(null, data);
  //             // callback(null, "No Data Found");
  //           } else {
  //             count = matchData.length;
  //             var data = {};
  //             data.options = options;
  //             data.results = returnReq;
  //             data.total = count;
  //             callback(null, data);
  //             // callback(null, data);
  //           }
  //         }
  //       });
  //     }
  //   });
  // }

};
module.exports = _.assign(module.exports, exports, model);