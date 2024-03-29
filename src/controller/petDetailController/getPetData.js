const PetImageModel = require("../../model/petImageModal");
const PetDetailsModal = require("../../model/petDetail");
const asyncHandler = require("express-async-handler");
const PetDetilsDTO = require("../../dto/resDTO/PetResDTO");

const getImage = asyncHandler(async (req, res) => {
  const name = req.params?.name;
  try {
    const petImage = await PetImageModel.findOne({ name: name });

    if (!petImage) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.set("Content-Type", "image/jpeg"); // Set the appropriate content type based on your image type
    res.send(petImage.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getPetDetails = asyncHandler(async (req, res) => {
  try {
    const allPetDetails = await PetDetailsModal.find({}).populate("image");
    const petDetailsDTOArray = allPetDetails.map(
      (petDetail) =>
        new PetDetilsDTO(
          petDetail.id,
          petDetail.code,
          petDetail.breed,
          petDetail.category,
          petDetail.price,
          petDetail.age,
          petDetail.description,
          petDetail.vaccinated,
          petDetail.image?.name
        )
    );
    res.json(petDetailsDTOArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getImage,
  getPetDetails,
};
