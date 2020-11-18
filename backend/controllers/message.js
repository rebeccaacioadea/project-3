const Message = require('../models/message')

function getMessages(req, res) {
  Message
    .find().sort({ 'createdAt': -1 })
    .populate('user')
    .then(resp => res.send(resp))
}

function addMessage(req, res) {
  const message = req.body
  message.user = req.currentUser
  Message
    .create(message)
    .then(message => res.send(message))
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

function editMessage(req, res) {
  const messageId = req.params.messageid
  const currentUser = req.currentUser

  Message
    .findById(messageId)
    .then(message => {
      if (!message) return res.status(404).send({ message: 'Message not found.' })
      if (!req.currentUser.isAdmin && !message.user.equals(currentUser._id)) {
        return res.status(401).send({ message: `${req.method} Unauthorized` })
      }
      message.set(req.body)
      message.save()
        .then(message => res.send(message))
    })
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
    .populate('comment.user')
    .then(message => {
      if (!message) return res.status(404).send({ message: 'Not found' })
      message.comments.push(comment)
      return message.save()
    })
    .then(message => res.send(message))
    .catch(error => res.send(error))
}


module.exports = {
  getMessages,
  getMessage,
  addMessage,
  editMessage,
  deleteMessage,
  postComment
}