import Pet from '../models/petModel.js'
import asyncHandler from 'express-async-handler'

//@desc     fetch all pets
//@route    Get /api/pets
//@access   public
const getPets = asyncHandler(async (req, res) => {
  const pets = await Pet.find({})

  res.json(pets)
})

//@desc     search all pets
//@route    Get /api/pets/search/:keyword
//@access   public
const searchPets = asyncHandler(async (req, res) => {
  const keyword = req.params.keyword
    ? {
        name: {
          $regex: req.params.keyword,
          $options: 'i',
        },
      }
    : null

  const pets = await Pet.find({ ...keyword })

  res.json(pets)
})

//@desc     fetch all pets in a category
//@route    Get /api/pets/category/:category
//@access   public
const getPetsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category
  const pets = await Pet.find({ category: category })
  res.json(pets)
})

//@desc     fetch all pets by location
//@route    Get /api/pets/location/:location
//@access   public
const getPetsByLocation = asyncHandler(async (req, res) => {
  const location = req.params.location
  const pets = await Pet.find({ location: location })
  res.json(pets)
})

//@desc     fetch a single pet
//@route    Get /api/pets/:id
//@access   public
const getPetById = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id)
  if (pet) {
    res.json(pet)
  } else {
    res.status(404)
    throw new Error('Pet Not Found')
  }
})

//@desc     delete a pet
//@route    DELETE /api/pets/:id
//@access   public/Admin
const deletePet = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id)
  if (pet) {
    await pet.remove()
    res.json({ msg: 'Pet Removed' })
  } else {
    res.status(404)
    throw new Error('Pet Not Found')
  }
})

//@desc     create a pet
//@route    POST /api/pets/
//@access   public/Admin
const createPet = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    breed,
    category,
    ContactNumber,
    isAvailable,
    isVaccinated,
    forSellOrDonation,
    age,
    location,
    user,
  } = req.body
  const pet = new Pet({
    user,
    name,
    price,
    description,
    image,
    breed,
    category,
    ContactNumber: ContactNumber,
    age,
    isVaccinated,
    isAvailable,
    location,
    forSellOrDonation,
  })
  const createdPet = await pet.save()
  res.status(201).json(createdPet)
})

//@desc     update a pet
//@route    PUT /api/pets/:id
//@access   public/Admin
const updatePet = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    breed,
    category,
    ContactNumber,
    isAvailable,
    isVaccinated,
    forSellOrDonation,
    age,
    location,
  } = req.body
  const pet = await Pet.findById(req.params.id)
  if (pet) {
    pet.name = name
    pet.price = price
    pet.description = description
    pet.image = image
    pet.breed = breed
    pet.category = category
    pet.ContactNumber = ContactNumber
    pet.age = age
    pet.isVaccinated = isVaccinated
    pet.isAvailable = isAvailable
    pet.location = location
    pet.forSellOrDonation = forSellOrDonation

    const updatedPet = await pet.save()
    res.json(updatedPet)
  } else {
    res.status(404)
    throw new Error('Pet Not Found')
  }
})

export {
  getPets,
  getPetsByCategory,
  getPetsByLocation,
  getPetById,
  deletePet,
  createPet,
  updatePet,
  searchPets,
}
