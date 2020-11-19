const mongoose = require('mongoose')

const secondCommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  secondComment: { type: String, required: true }
}, {
  timestamps: true
})

const directCommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  directComment: { type: String, required: true },
  secondComments: [secondCommentSchema]
}, {
  timestamps: true
})

const postSchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  directComments: [directCommentSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('post', postSchema)