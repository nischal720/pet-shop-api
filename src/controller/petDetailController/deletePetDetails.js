const asyncHandler = require("express-async-handler");
const PetDetailsModal = require("../../model/petDetail");
const PetImageModal = require("../../model/petImageModal");
const validateMongoDBID = require("../../utils/validateMongoDBID");

const deletePetDetails = asyncHandler(async (req, res) => {
  const id = req.query.id;
  try {
    if (!id) throw new Error("No  ID provided");
    validateMongoDBID(id);

    const petDetails = await PetDetailsModal?.findById(id);
    const imageId = petDetails?.image?.toString();

    if (!petDetails) {
      return res.status(404).json({ message: "Not Found" });
    }
    await PetDetailsModal.deleteOne({ _id: id });
    await PetImageModal.deleteOne({ _id: imageId });
    res.json("Successfully Delete");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

module.exports = { deletePetDetails };
