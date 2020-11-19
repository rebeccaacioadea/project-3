const Message = require('../models/message')

function getMessages(req, res) {
  Message
    .find().sort({ 'createdAt': -1 })
    .populate('user')
    .populate('comments.user')
    .then(resp => res.send(resp))
}

function addMessage(req, res) {
  const message = req.body
  message.user = req.currentUser
  Message
    .create(message)
  Message
    .find().sort({ 'createdAt': -1 })
    .then(resp => res.send(resp))
    .catch(error => res.send(error))
}

function getMessage(req, res) {
  const messageId = req.params.messageid
  Message
    .findById(messageId)
    .populate('user')
    .populate('comments.user')
    .then(message => res.send(message))
    .catch(error => res.send(error))
}

function deleteMessage(req, res) {
  const messageId = req.params.messageid
  const currentUser = req.currentUser
  Message
    .findById(messageId)
    .then(message => {
      if (!message) return res.status(404).send({ message: 'Message not found.' })
      if (!req.currentUser.isAdmin && !message.user.equals(currentUser._id)) {
        return res.status(401).send({ message: `${req.method} Unauthorized` })
      }
      message.deleteOne()
      res.status(202).send({ message: 'DELETE accepted.' })
    })
    .catch(error => res.send(error))
}

function postComment(req, res) {
  const comment = req.body
  const messageId = req.params.messageid
  comment.user = req.currentUser
  Message
    .findById(messageId)
    .populate('user')
    .then(message => {
      if (!message) return res.status(404).send({ message: 'Not found' })
      message.comments.push(comment)
      return message.save()
    })
  Message
    .find().sort({ 'createdAt': -1 })
    .populate('user')
    .populate('comments.user')
    .then(resp => {
      return res.send(resp)
    })
    .catch(error => res.send(error))
}

function deleteComment(req, res) {
  const messageId = req.params.messageid
  Message
    .findById(messageId)
    .then(message => {
      if (!message) return res.status(404).send({ message: 'Message not found.' })
      const comment = message.comments.id(req.params.commentid)
      if (!req.currentUser.isAdmin && !comment.user.equals(req.currentUser._id) || !message.user.equals(req.currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      comment.remove()
      return message.save()
    })
    .then(message => res.send(message))
    .catch(error => res.send(error))
}

module.exports = {
  getMessages,
  getMessage,
  addMessage,
  deleteMessage,
  postComment,
  deleteComment
}