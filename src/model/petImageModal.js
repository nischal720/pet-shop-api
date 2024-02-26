const mongoose = require("mongoose");

const validateImageSize = function (image) {
  return image?.length <= 100 * 1024; // 100 KB in bytes
};

const imageSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  data: {
    type: Buffer,
    validate: {
      validator: (val) => validateImageSize(val),
      message: "Image size must be less than or equal to 100 KB",
    },
  },
});


module.exports = mongoose.model("pet_images", imageSchema);
