const mongoose = require('mongoose')

const bulletinSchema = new mongoose.Schema(
  {
    eleve: {
      type: mongoose.Types.ObjectId,
      ref: 'eleve',
      required: true
    },
    matieres: [
      {
        nom: {
          type: String,
        },
        coeff: {
          type: Number,
        },
        note:{
          type: Number,
        }
      }
    ]
  },
  {timestamps : true}
)

module.exports = mongoose.model("bulletin", bulletinSchema)