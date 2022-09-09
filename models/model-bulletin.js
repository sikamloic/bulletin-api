const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true
    },
    matieres: [
      {
        nom: {
          type: String,
        },
        coeff: {
          type: Number,
        }
      }
    ]
  },
  {timestamps : true}
)

module.exports = mongoose.model("model", modelSchema)