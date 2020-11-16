import React, { useState } from 'react'
import axios from 'axios'

import Bulma from 'bulma'

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


  return <form className="login" onSubmit={handleSubmit} >
    <div className="field">
      <label className="label">Username</label>
      <div className="control">
        <input className="input" 
          type="text" 
          placeholder=""
          onChange={handleChange}
          value = {formData.userName}
          name = "userName"
        />
      </div>
    </div>

    <div className="field">
      <label className="label">Password</label>
      <div className="control">
        <input className="input" 
          type="text" 
          placeholder=""
          onChange={handleChange}
          value = {formData.password}
          name = "password"
        />
      </div>
    </div>

    <div className="control">
      <button className="button is-primary">Submit</button>
    </div>
   
  </form>
}

export default Login