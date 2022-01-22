import User from '../models/userModel.js'
import Pet from '../models/petModel.js'
import asyncHandler from 'express-async-handler'

//@desc     get all favourites
//@route    GET /api/favpet
//@access   private
const getAllFavourites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json(user.favourites)
})

//@desc     add to fav
//@route    POST /api/favpet/:pet_id
//@access   private
const addToFavourites = asyncHandler(async (req, res) => {
  const pet_id = req.params.pet_id
  const user = await User.findById(req.user._id)
  if (user.favourites) {
    user.favourites.map((favpet) => {
      if (favpet.pet === pet_id)
        res.json({ msg: 'This Pet is already a favourite one' })
    })
  }
  user.favourites.push({ pet: pet_id })
  const updatedUser = await user.save()
  res.json(updatedUser.favourites)
})

//@desc     delete from  favourites
//@route    DELETE /api/favpet/:pet_id
//@access   private
const deletefromFavourites = asyncHandler(async (req, res) => {
  const pet_id = req.params.pet_id

  const user = await User.findById(req.user._id)

  let favs = []
  user.favourites.map((item) => {
    favs.push(item.pet.toString())
  })
  if (favs.includes(pet_id)) {
    user.favourites.map((item) => {
      if (item.pet.toString() === pet_id) {
        item.remove()
      }
    })
    const updatedUser = await user.save()
    res.json(updatedUser.favourites)
  } else {
    res.json({ msg: 'This is not a favourite pet' })
  }
})

export { addToFavourites, deletefromFavourites, getAllFavourites }
