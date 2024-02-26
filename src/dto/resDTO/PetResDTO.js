class PetResDTO {
  constructor(
    id,
    code,
    breed,
    category,
    price,
    age,
    description,
    vaccinated,
    image
  ) {
    this.id = id;
    this.code = code;
    this.breed = breed;
    this.category = category;
    this.price = price;
    this.age = age;
    this.description = description;
    this.vaccinated = vaccinated;
    this.image = image;
  }
}

module.exports = PetResDTO;
