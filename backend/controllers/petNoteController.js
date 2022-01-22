import User from '../models/userModel.js'
import Pet from '../models/petModel.js'
import asyncHandler from 'express-async-handler'

//@desc     get all petnote
//@route    GET /api/petnote
//@access   private
const getAllPetNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json(user.petNote)
})

//@desc     add and edit petnote
//@route    PUT /api/petnote/:petId
//@access   private
const addPetNote = asyncHandler(async (req, res) => {
  const pet_id = req.params.pet_id
  const note = req.body.note
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  if (!note || note.length === 0) {
    res.status(400).json({ msg: 'Note is Empty' })
  } else {
    const user = await User.findById(req.user._id)

    if (user) {
      let notedPets = []
      user.petNote.map((item) => {
        notedPets.push(item.id)
      })
      if (notedPets.includes(pet_id)) {
        user.petNote.map((item) => {
          if (item.id === pet_id) {
            item.note = note
            item.name = name
            item.category = category
            item.image = image
          }
        })
        const updatedUser = await user.save()
        res.json(updatedUser)
      } else {
        user.petNote.push({ id: pet_id, note, name, category, image })
        const updatedUser = await user.save()
        res.json(updatedUser)
      }
    } else {
      res.status(404)
      throw new Error('User does not exist')
    }
  }
})

//@desc     delete petNote
//@route    DELETE /api/petnote/:petId
//@access   private
const deletePetNote = asyncHandler(async (req, res) => {
  const pet_id = req.params.pet_id

  const user = await User.findById(req.user._id)

  if (user) {
    let notedPets = []
    user.petNote.map((item) => {
      notedPets.push(item.id)
    })
    if (notedPets.includes(pet_id)) {
      user.petNote.map((item) => {
        if (item.id === pet_id) {
          item.remove()
        }
      })
      const updatedUser = await user.save()
      res.json(updatedUser)
    } else {
      res.json({ msg: 'Pet Note Doesnt Exist' })
    }
  } else {
    res.status(404)
    throw new Error('User does not exist')
  }
})

export { addPetNote, deletePetNote, getAllPetNotes }
