const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    description:  {
        type: String,
    },
    img: {
        type: String
    },
    imgTitle: {
        type: String
    },
    video: {
        type: String
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("Movie", movieSchema);