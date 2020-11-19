import React, { useEffect, useState } from 'react'
import axios from 'axios'


// ! This is the social feed
// * List of all posts in time order 
// * Image with caption 
// * Button to like
// * Button to comment
// * If you click on their profile image it will take you to their profile




const Fernstagram = () => {

  const [feedData, updateFeedData] = useState([])
  const [text, setText] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('/api/social', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        const data = resp.data
        console.log(data)
        updateFeedData(data)
      })
  }, [])


  // function handleComments(photoid) {
  //   axios.post(`/api/social/${photoid}/comment`, { text }, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then(resp => {
  //       setText('')
  //       updateFeedData(resp.data)
  //     })
  // }

  return <main>
    <section className='cover'>
      <h1>FernGram</h1>
    </section>
    {feedData.length === 0 &&
      <section className='content'>
        <section className='margin'>
          <h4>
            There Are No Posts To Be Found!
          </h4>
        </section>
      </section>}
    <section className='social-feed'>
      {feedData.length > 0 && feedData.map(post => {
        var timestamp = new Date(post.createdAt)
        var datetime = timestamp.getDate() + '/'
          + (timestamp.getMonth() + 1) + '/'
          + timestamp.getFullYear() + ' at '
          + timestamp.getHours() + ':'
          + timestamp.getMinutes() + ':'
          + timestamp.getSeconds()
        return <div
          key={post._id}
          className='social-item'>
          <div className='title'>
            <h3>User: {post.user.name}</h3>
            {/* { console.log(post._id)} */}
            <h4>Posted: {datetime}</h4>
          </div>
          <div className='image-container'
            style={{ background: `url(${post.image}) no-repeat center center`, backgroundSize: 'cover', height: '550px', width: '550px' }}
          >
          </div>
          <p>{post.caption}</p>
          {/* <button className="button-green"
          >Comments</button> */}

          <textarea
            className="input"
            placeholder="Add a comment"
            onChange={event => setText(event.target.value)}
            value={text}
          >
            {text}
          </textarea>
          <button
            // onClick={handleComments(post._id)}
          >Submit</button>

        </div>
      })}
    </section>


  </main>
}

export default Fernstagram