const mongoose = require('mongoose');

function capitalize (val) {
  if (typeof(val)  !== 'string') val = '';
  return val.charAt(0).toUpperCase() + val.substring(1);
}

const eleveSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      set: capitalize
    },
    prenom: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    classe: {
      type: String,
      required: true
    }
  },
  {timestamps : true}
)

module.exports = mongoose.model("eleve", eleveSchema)