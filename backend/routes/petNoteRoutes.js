import express from 'express'
const router = express.Router()
import {
  addPetNote,
  deletePetNote,
  getAllPetNotes,
} from '../controllers/petNoteController.js'
import { protect } from '../middleware/authMiddleware.js'

//@desc     fetch all pets
//@route    Get /api/pets
//@access   public
router.route('/').get(protect, getAllPetNotes)

router
  .route('/:pet_id')
  .post(protect, addPetNote)
  .delete(protect, deletePetNote)

export default router
