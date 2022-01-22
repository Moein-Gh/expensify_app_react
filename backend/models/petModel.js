import mongoose from 'mongoose'

const petSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
    },
    age: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ContactNumber: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    forSellOrDonation: {
      type: String,
      required: true,
      default: 'sell',
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    isVaccinated: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
)

const Pet = mongoose.model('pet', petSchema)

export default Pet
