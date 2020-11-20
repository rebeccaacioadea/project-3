
const Social = require('../models/social')

function getFeed(req, res) {
  Social
    .find().sort({ 'createdAt': -1 })
    .populate('user')
    .populate('directComments.user')
    // .populate('directComments.secondComments.user')
    .then(resp => res.send(resp))
}

function postFeed(req, res) {
  const post = req.body
  post.user = req.currentUser
  Social
    .create(post)
    .then(post => res.send(post))
    .catch(error => res.send(error))
}

function getUserFeed(req, res) {
  const userId = req.params.userid
  Social
    .find({ user: userId })
    .then(resp => res.send(resp))
    .catch(err => res.send(err))
}

function postComment(req, res) {
  const comment = req.body
  const socialId = req.params.socialid
  comment.user = req.currentUser
  Social
    .findById(socialId)
    .populate('user')
    .then(social => {
      if (!social) return res.status(404).send({ message: 'Post not found' })
      social.directComments.push(comment)
      return social.save()
    })
    .then(message => res.send(message))
    .catch(error => res.send(error))
}

function deleteComment(req, res) {
  const socialId = req.params.socialid
  Social
    .findById(socialId)
    .then(social => {
      if (!social) return res.status(404).send({ message: 'Post not found.' })
      const directComment = social.directComments.id(req.params.commentid)
      if (!req.currentUser.isAdmin && !social.user.equals(req.currentUser._id) || !directComment.user.equals(req.currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      directComment.remove()
      return social.save()
    })
    .then(social => res.send(social))
    .catch(error => res.send(error))
}

function deleteFeedPost(req, res) {
  const socialId = req.params.socialid
  const currentUser = req.currentUser
  Social
    .findById(socialId)
    .then(post => {
      if (!post) return res.status(404).send({ message: 'Message not found.' })
      if (!req.currentUser.isAdmin && !post.user.equals(currentUser._id)) {
        return res.status(401).send({ message: `${req.method} Unauthorized` })
      }
      post.deleteOne()
      res.status(202).send({ message: 'DELETE accepted.' })
    })
    .catch(error => res.send(error))
}

// function postNestedComment(req, res) {
//   const secondComment = req.body
//   const socialId = req.params.socialid
//   const commentId = req.params.commentid
//   secondComment.user = req.currentUser
//   Social
//     .findById(socialId)
//     .then(post => {
//       if (!post) return res.status(404).send({ message: 'Message not found.' })
//       post.directComments.id(commentId).secondComments.push(secondComment)
//       post.save()
//       res.send(post)
//     })
// }

// function deleteNestedComment(req, res) {
//   const socialId = req.params.socialid
//   const commentId = req.params.commentid
//   const nestedId = req.params.nestedid
//   Social
//     .findById(socialId)
//     .then(post => {
//       if (!post) return res.status(404).send({ message: 'Message not found.' })
//       if (!req.currentUser.isAdmin && !post.user.equals(req.currentUser._id) 
//       || !post.directComments.id(commentId).secondComments.id(nestedId).equals(req.currentUser._id)) {
//         return res.status(401).send({ message: 'Unauthorized' })
//       }
//       post.directComments.id(commentId).secondComments.id(nestedId).remove()
//       post.save()
//       res.send(post)
//     })
// }

module.exports = {
  getFeed,
  postFeed,
  getUserFeed,
  postComment,
  deleteComment,
  deleteFeedPost
  // postNestedComment,
  // deleteNestedComment
}