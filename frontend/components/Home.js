import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import Logo from '../images/BG.jpeg'


// ! This is the landing page
// * Hero/background
// * Login/Register buttons
// * About Us

// ? Limited functionality if you're not logged in



const Home = () => {

  const [user, updateUser] = useState([])

  const token = localStorage.getItem('token')

  if (!token) return <section>
    <h1>Hi there</h1>
    <h2>No one logged in here!</h2>
  </section>

  useEffect(() => {
    axios.get(`api/user/${getUserId()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUser(resp.data)
      })
  }, [])

  return <main> 
    <section className="header">
      <h1>hello</h1>
    </section>

  </main>
}

export default Home