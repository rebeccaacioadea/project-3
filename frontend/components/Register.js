import React, { useState } from 'react'
import axios from 'axios'


const Register = (props) => {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }

    const newErrors = {
      ...errors,
      [name]: ''
    }

    updateFormData(data)
    updateErrors(newErrors)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api//user/register', formData)
      .then(resp => {
        console.log(resp.data)
        if (resp.data.errors) {
          updateErrors(resp.data.error)
        } else {
          props.history.push('/user/login')
        }
         
       

      })
  }
  
  return <form onSubmit={handleSubmit}>
    <h1> Create Account</h1>
    <div>
      <div>
        <input
          type = "text"
          onChange = {handleChange}
          value = {formData.username}
          name="username"
          placeholder = "Username"
        />
      </div>
      <div>
        <input
          type = "text"
          onChange = {handleChange}
          value = {formData.email}
          name="email"
          placeholder = "Email"
        />
      </div>
      <div>
        <input
          type = "text"
          onChange = {handleChange}
          value = {formData.password}
          name="password"
          placeholder = "Password"
        />
      </div>
      <div>
        <input
          type = "text"
          onChange = {handleChange}
          value = {formData.passwordConfirmation}
          name="passwordConfirmation"
          placeholder = "Confirm Password"
        />
      </div>
    </div>
    <button>Create Account</button>
    

  </form>
}

export default Register