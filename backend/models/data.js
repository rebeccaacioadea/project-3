const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
  image: { type: String, required: true },
  commonName: { type: String, required: true },
  scientificName: { type: String, required: true },
  library: { type: String, required: false },
  synonyms: { type: String, required: false },
  careNotes: { type: String, required: false },
  outdoor: { type: Boolean, required: false },
  plantType: { type: String,required: false },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Data', dataSchema)