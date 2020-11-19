import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId, isCreator } from '../lib/auth'
import { update } from '../../backend/models/data'


const PlantSitters = (props) => {
  const token = localStorage.getItem('token')
  // console.log(token)
  // console.log(props)

  // ! A function to reload the page 
  const refreshPage = () => {
    window.location.reload()
  }


  const [text, setText] = useState('')

  const [userData, updateUserData] = useState({})

  useEffect(() => {
    axios.get(`/api/user/${getUserId()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        const data = resp.data
        console.log(data)
        updateUserData(data)
      })
  }, [])


  const [messages, updateMessages] = useState([])

  useEffect(() => {
    axios.get('/api/messages/message-board', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateMessages(resp.data)

      })
  }, [])


  const [userMessage, updateUserMessage] = useState({
    commentBody: '',
    dateStart: '',
    dateEnd: ''
  })


  function handleMessageChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...userMessage,
      [name]: value
    }
    updateUserMessage(data)
  }


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


  function handleDeleteUserMessage(messageId) {
    axios.delete(`/api/messages/${messageId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMessages(resp.data)
      })
    refreshPage()
  }


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

  function handleDeleteComment(messageId, commentId) {

    axios.delete(`/api/messages/${messageId}/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMessages(resp.data)
      })
    refreshPage()
  }
   
  return <div>
    <h1>hello plantsitters</h1>
    <h2>{userData.userName} </h2>
    <div className="messages" >

      {/* show All the messages */}
      {!messages.commentBody && messages.map((message) => {
        const messageId = message._id

        return <div className="messageBoard "
          key={message._id}>
                    
          {isCreator && <div className = "deleteButton">
            <button
              onClick={() => handleDeleteUserMessage(messageId)}>
              Delete Your Message
            </button>
          </div>}
          {isCreator && <div className = "updateButton">
            <button
              onClick={() => handleDeleteUserMessage(messageId)}>
              Update Your Message
            </button>
          </div>}
          <h3 className="title is-4"> {message.user.userName} </h3>
          <div>
            <p>{message.commentBody} </p>
            <small> From: {message.dateStart} </small>
            <small> To: {message.dateEnd} </small>
          </div>

          {/* show the comments on the message Board */}
          {message.comments && message.comments.map(comment => {
            const commentId = comment._id
            return <article className="comments"
              key={comment._id}>
              <h4>Replies</h4>
              <h6>{comment.user.userName} </h6>
              <small>{comment.createdAt} </small>
              <p>{comment.text} </p>
              {isCreator && <div>
                <button
                  onClick = {() => handleDeleteComment(messageId, commentId) }
                > Delete your comment
                </button>
              </div> }
            </article>
          })}

          <div>

            <p>
              <textarea
                className=""
                placeholder="Write Your Comment"
                onChange={event => setText(event.target.value)}
                value={text[message._id]}
                name="comment"

              >
              </textarea>
            </p>
            <button
              onClick={() => handleComment(messageId) }
            > Reply
            </button>

          </div>


        </div>
      })}
    </div>





    <article className="messageBox">

      <h2> Add Your Message To Pin Board</h2>

      <div>
        <p>
          <textarea
            className="textarea"
            placeholder="Write your message"
            onChange={handleMessageChange}
            value={userMessage.commentBody}
            name="commentBody"
          >
            {userMessage}
          </textarea>
        </p>
      </div>
      <div>
        <label className="label"><h5>From</h5></label>
        <input className="input"
          type="text"
          placeholder="Enter the start date"
          onChange={handleMessageChange}
          value={userMessage.dateStart}
          name="dateStart"
        />
      </div>
      <div>
        <label className="label"><h5>To</h5></label>
        <input className="input"
          type="text"
          placeholder="Enter the end date"
          onChange={handleMessageChange}
          value={userMessage.dateEnd}
          name="dateEnd"
        />
      </div>
      <div>
        <p>
          <button
            onClick={handleMessageSubmit}
          >

            Submit
          </button>
        </p>
      </div>
    </article>
  </div>



}

export default PlantSitters