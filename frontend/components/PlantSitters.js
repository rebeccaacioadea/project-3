import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import moment from 'moment'
import { Link } from 'react-router-dom'

const PlantSitters = () => {
  const token = localStorage.getItem('token')
  const [text, setText] = useState('')
  const [messages, updateMessages] = useState([])



  // ? A function to reload the page 
  const refreshPage = () => {
    window.location.reload()
  }

  // ? GET ALL MESSAGES
  useEffect(() => {
    axios.get('/api/messages/message-board', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMessages(resp.data)
      })
  }, [])


  // ? MESSAGE FORM
  const [userMessage, updateUserMessage] = useState({
    commentBody: '',
    dateStart: '',
    dateEnd: ''
  })

  // ? UPDATE MESSAGE FORM
  function handleMessageChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...userMessage,
      [name]: value
    }
    updateUserMessage(data)
  }

  // ? POST MESSAGE 
  function handleMessageSubmit(event) {
    event.preventDefault()
    axios.post('/api/messages/message-board', userMessage, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUserMessage('')
        updateMessages(resp.data)
      })
    refreshPage()
  }

  // ? DELETE MESSAGE
  function handleDeleteUserMessage(messageId) {
    axios.delete(`/api/messages/${messageId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMessages(resp.data)
      })
    refreshPage()
  }

  // ? POST COMMENT
  function handleComment(messageId) {
    axios.post(`/api/messages/${messageId}/comment`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        setText('')
        updateMessages(resp.data)
      })
    refreshPage()
  }

  // ? DELETE COMMENT
  function handleDeleteComment(messageId, commentId) {
    axios.delete(`/api/messages/${messageId}/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMessages(resp.data)
      })
    refreshPage()
  }

  return <main>
    <section className="cover">
      <h1>Pin Board</h1>
    </section>

    <section className="content">
      <section className="margin">

        <section className="add-message">
          <h2>Post a message</h2>

          <div className="form-section">
            <textarea
              className="input"
              placeholder="Write your message"
              onChange={handleMessageChange}
              value={userMessage.commentBody}
              name="commentBody"
            ></textarea>
          </div>
          <div className="date">
            <label className="label"><h5>Looking From</h5></label>
            <input id="date"
              type="date"
              onChange={handleMessageChange}
              value={userMessage.dateStart}
              name="dateStart"
            />
          </div>
          <div className="date">
            <label className="label"><h5>Until</h5></label>
            <input id="date"
              type="date"
              onChange={handleMessageChange}
              value={userMessage.dateEnd}
              name="dateEnd"
            />
          </div>

          <button
            className="button-green"
            onClick={handleMessageSubmit}>
            Submit
          </button>
        </section>


      </section>
    </section>

    <div className="board" >

      {/* MESSAGES */}
      {!messages.commentBody && messages.map((message) => {
        const messageId = message._id

        return <div className="messages"
          key={message._id}>
          <Link to={`/user-page/${message.user._id}`}>
            <h4> {message.user.name} </h4>
          </Link>
          {/* {console.log(message)} */}
          <h5> From  {message.dateStart} || To  {message.dateEnd}</h5>
          <div className="message">
            <h4>{message.commentBody} </h4>
          </div>
          {isCreator(message.user._id) && <div >
            <button className="button-green button-red button-message"
              onClick={() => handleDeleteUserMessage(messageId)}>
              Delete Your Message
            </button>
          </div>}

          {/* COMMENTS */}
          {message.comments && message.comments.map(comment => {
            const commentId = comment._id
            return <section className="reply"
              key={comment._id}>
              <Link to={`/user-page/${comment.user._id}`}>
                <h6>{comment.user.name} </h6>
              </Link>
              <h5>RESPONDED</h5>
              <h4>{comment.text} </h4>
              <h5>{moment(comment.createdAt).format('LLL')}</h5>
              {isCreator(comment.user._id) && <div>
                <button className="button-green button-delete-comment"
                  onClick={() => handleDeleteComment(messageId, commentId)}
                > Delete your comment
                </button>
              </div>}
            </section>
          })}

          <textarea
            className="input board-reply"
            placeholder="Write Your Comment"
            onChange={event => setText(event.target.value)}
            value={text[message._id]}
            name="comment"
          >
          </textarea>

          <button
            className="button-green"
            onClick={() => handleComment(messageId)}> Reply To Message
          </button>



        </div>
      })}
    </div>



  </main>



}

export default PlantSitters