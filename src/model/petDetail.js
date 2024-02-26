const mongoose = require("mongoose");

var petSchema = new mongoose.Schema(
  {
    breed: { type: String, required: true },
    category: { type: String, required: true },
    code: { type: String, unique: true },
    price: { type: Number, required: true },
    age: { type: Number, required: true },
    description: {
      type: String,
    },
    vaccinated: { type: Boolean, default: false },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "pet_images" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pet_detail", petSchema);
