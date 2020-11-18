import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId, isCreator } from '../lib/auth'



const PlantSitters = (props) => {
  const token = localStorage.getItem('token')
  console.log(token)

  

  const [text, setText] = useState('')

  const [userData, updateUserData] = useState({})

  useEffect(() =>{
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
    axios.get('/api/messages/message-board' , {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateMessages(resp.data)
        
      })
  }, [])

  // console.log(messages)


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


    axios.post('/api/messages/message-board',  userMessage , {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMessages(resp.data)
        updateUserMessage('')
       
      })
  }



  function handleDeleteUserMessage(messageId){
    axios.delete(`/api/messages/${messageId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMessages(resp.data)
      })
  }


  function handleComment(messageId) {
    axios.post(`/api/messages/${messageId}/comment`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        setText('')
        updateMessages(resp.data)
      })
  }


  return <div>
    <h1>hello plantsitters</h1>
    <h2>{userData.userName} </h2>
    <div className ="messages" >        
      {!messages.commentBody && messages.map((message, index) => {
        return <div className="messageBoard " 
          key={index}> 
          <h4 className="title is-4"> {message.user.userName} </h4>
          <div>
            <h6> From: {message.dateStart} </h6>
            <h6> To: {message.dateEnd} </h6>
            <p>{message.commentBody} </p>
          </div>
          <div>
        
            <p>
              <textarea
                className= ""
                placeholder = "Your Reply"
                onChange = {event => setText(event.target.value)}
                value = {text}
              >    
              </textarea>
            </p>
            <button
              onClick = {handleComment}
            > Reply 
            </button>

          </div>
       
          {/* <button> Update Your Message</button> */}
          {isCreator && <div>
            <button
              onClick = {() => handleDeleteUserMessage(message._id) }> 
              Delete Your Message
            </button>
          </div>}
        </div>
      })}
 
    </div>


      

    
    <article>
     
      <div>
        <p>
          <textarea
            className= "textarea"
            placeholder ="Write your message"
            onChange = { handleMessageChange }
            value = {userMessage.commentBody}
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
            onClick = {handleMessageSubmit}
          >

            Submit
          </button>
        </p>
      </div>
    </article>
  </div>
  
 

}

export default PlantSitters