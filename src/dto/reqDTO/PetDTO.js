const validator = require("validator");

class PetDTO {
  constructor(
    code,
    breed,
    category,
    price,
    age,
    description,
    vaccinated
  ) {
    if (!validator?.isNumeric(price) || price <= 0) {
      throw new Error("Price  must be a numeric value greater than 0.");
    }

    if (!validator?.isNumeric(age) || age <= 0) {
      throw new Error("Age  must be a numeric value greater than 0.");
    }
    this.code = code;
    this.breed = breed;
    this.category = category;
    this.price = price;
    this.age = age;
    this.description = description;
    this.vaccinated = vaccinated;
  }
}

module.exports = PetDTO;
