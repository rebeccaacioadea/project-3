import React, { useState } from 'react'
import axios from 'axios'

// * Standard Login Form (Pre populate?)
// * Once logged in -> Link to Home

const Login = (props) => {

  const [formData, updateFormData] = useState({
    userName: '',
    password: ''
  })

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/user/login/', formData)
      .then(resp => {
        localStorage.setItem('token', resp.data.token)
      
        props.history.push('/')
      })
  }


  return <form onSubmit={handleSubmit} >
    <div>
      <label>Username</label>
      <input 
        type ="text"
        onChange={handleChange}
        value = {formData.userName}
        name = "userName"
      />
    </div>

    <div>
      <label>Password</label>
      <input 
        type ="text"
        onChange={handleChange}
        value = {formData.password}
        name = "password"
      />
    </div>
    <button>Login </button>
  </form>
}

export default Login