import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId, isCreator } from '../lib/auth'
import moment from 'moment'
import { Link } from 'react-router-dom'

const PlantSitters = () => {
  const token = localStorage.getItem('token')
  const [text, setText] = useState('')
  const [userData, updateUserData] = useState({})
  const [messages, updateMessages] = useState([])



  // ? A function to reload the page 
  const refreshPage = () => {
    window.location.reload()
  }

  // ? GET USER DATA... why?
  useEffect(() => {
    axios.get(`/api/user/${getUserId()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        const data = resp.data
        updateUserData(data)
      })
  }, [])

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


// return <div>
// <h1>hello plantsitters</h1>
// <h2>{userData.userName} </h2>
// <div className="messages" >

//   {/* show All the messages */}
//   {!messages.commentBody && messages.map((message) => {
//     const messageId = message._id

//     return <div className="messageBoard "
//       key={message._id}>

//       {isCreator && <div className="deleteButton">
//         <button
//           onClick={() => handleDeleteUserMessage(messageId)}>
//           Delete Your Message
//         </button>
//       </div>}
//       {isCreator && <div className="updateButton">
//         <button
//           onClick={() => handleMessageChange(messageId)}>
//           Update Your Message
//         </button>
//       </div>}
//       <h3 className="title is-4"> {message.user.userName} </h3>
//       <div>
//         <p>{message.commentBody} </p>
//         <small> From: {message.dateStart} </small>
//         <small> To: {message.dateEnd} </small>
//       </div>

{/* show the comments on the message Board */ }
{/* {message.comments && message.comments.map(comment => {
        const commentId = comment._id
        return <article className="comments"
          key={comment._id}>
          <h4>Replies</h4>
          <h6>{comment.user.userName} </h6>
          <small>{comment.createdAt} </small>
          <p>{comment.text} </p>
          {isCreator && <div>
            <button
              onClick={() => handleDeleteComment(messageId, commentId)}
            > Delete your comment
            </button>
          </div>}
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
          onClick={() => handleComment(messageId)}
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
      type="date"
      placeholder="Enter the start date"
      onChange={handleMessageChange}
      value={userMessage.dateStart}
      name="dateStart"
    />
  </div>
  <div>
    <label className="label"><h5>To</h5></label>
    <input className="input"
      type="date"
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
 */}
