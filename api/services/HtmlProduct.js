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
        ref: "HtmlBrand"
    }
});

schema.plugin(deepPopulate, {
    populate: {
        'company': {
            select: ""
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model("HtmlProduct", schema);

var exports = _.cloneDeep(
    require("sails-wohlig-service")(schema, "company", "company")
);
var model = {};
module.exports = _.assign(module.exports, exports, model);