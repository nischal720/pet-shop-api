const asyncHandler = require("express-async-handler");
const PetDetailModal = require("../../model/petDetail");
const PetImageModal = require("../../model/petImageModal");

const updatePetDetails = asyncHandler(async (req, res) => {
  const petId = req.params.id;

  const { code, breed, category, price, age, description, vaccinated } =
    req.body;
  const petImage = req?.files?.image;
  try {
    const existingPet = await PetDetailModal.findById(petId).populate("image");

    if (!existingPet) {
      throw new Error("Pet not found");
    }
    const existingImage = await PetImageModal.findById(existingPet.image?._id);

    if (existingImage) {
      existingImage.name = petImage
        ? petImage?.name?.split(".")?.[0]
        : existingImage.name;
      existingImage.data = petImage ? petImage?.data : existingImage.data;
      existingImage.save();
    } else {
      existingImage.name = petImage?.name?.split(".")?.[0];
      existingImage.data = petImage?.data;
      existingImage.save();
    }

    existingPet.code = code || existingPet.code;
    existingPet.breed = breed || existingPet.breed;
    existingPet.category = category || existingPet.category;
    existingPet.price = price || existingPet.price;
    existingPet.age = age || existingPet.age;
    existingPet.description = description || existingPet.vaccinated;
    existingPet.vaccinated = vaccinated || existingPet.vaccinated;
    existingPet.image = existingImage._id;
    await existingPet.save();

    res.json("Update Successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { updatePetDetails };
