const asyncHandler = require("express-async-handler");
const PetDTO = require("../../dto/reqDTO/PetDTO");
const PetDetailModel = require("../../model/petDetail");
const PetResDTO = require("../../dto/resDTO/PetResDTO");
const PetImageModel = require("../../model/petImageModal");

const createPetDetails = asyncHandler(async (req, res) => {
  const { code, breed, category, price, age, description, vaccinated } =
    req.body;
  const image = req?.files?.image;

  const petReqDTO = new PetDTO(
    code,
    breed,
    category,
    price,
    age,
    description,
    vaccinated
  );

  try {
    const isPresent = await PetDetailModel.findOne({ code: code });
    const imageId = isPresent?.image?.toString();
    const isImagePresent = await PetImageModel.findOne({ _id: imageId });

    if (isPresent) {
      return res.status(500).json("Pet Code Already exists");
    }

    if (isImagePresent) {
      return res.json("The same image name already exist");
    }

    // Check image size before saving
    if (image.size > 100 * 1024) {
      // Size validation failed
      return res
        .status(400)
        .json("Image size must be less than or equal to 100 KB");
    }

    const savedImage = await PetImageModel.create({
      name: image?.name?.split(".")[0],
      data: image?.data,
    });

    const saveData = await PetDetailModel.create({
      code: petReqDTO.code,
      breed: petReqDTO.breed,
      category: petReqDTO.category,
      price: petReqDTO.price,
      vaccinated: petReqDTO.vaccinated,
      description: petReqDTO.description,
      age: petReqDTO.age,
    });
    // Associate the saved image with the pet details
    saveData.image = savedImage._id;
    await saveData.save();

    const petImage = await PetDetailModel.findOne({
      code: saveData.code,
    }).populate("image");

    const petResData = new PetResDTO(
      saveData.id,
      saveData.code,
      saveData.breed,
      saveData.category,
      saveData.price,
      saveData.age,
      saveData.description,
      saveData.vaccinated,
      petImage?.image?.name
    );

    res.json(petResData);
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
});

module.exports = { createPetDetails };
