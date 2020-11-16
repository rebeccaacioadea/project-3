const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const messageSchema = new mongoose.Schema({
  commentBody: { type: String, required: true },
  dateStart: { type: String, required: true },
  dateEnd: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Message', messageSchema)