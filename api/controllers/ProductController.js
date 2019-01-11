module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getAllData: function (req, res) {
        if (req.body) {
            //   console.log("test", data);
            Product.getAllData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    getOneData: function (req, res) {
        Product.getOneData(req.body, res.callback);
    },
    getOneByBrand: function (req, res) {
        Product.getOneByBrand(req.body, res.callback);
    },
    getOneByNameBrandid: function (req, res) {
        Product.getOneByNameBrandid(req.body, res.callback);
    },
    getOneByNameBrandName: function (req, res) {
        Product.getOneByNameBrandName(req.body, res.callback);
    }
    // },
    // search: function (req, res) {
    //     Product.search(req.body, res.callback);
    // }



};
module.exports = _.assign(module.exports, controller);