import React, { useState } from 'react'
import axios from 'axios'



const Register = (props) => {

  const [formData, updateFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    postcode: ''
  
  })
  const [errors, updateErrors] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    postcode: ''
 
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
  console.log(formData)
  
  return <form onSubmit={handleSubmit}>
    <h1> Create Account</h1>

    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Full Name</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <input className="input" 
              type="text" 
              placeholder=""
              onChange = {handleChange}
              value = {formData.name}
              name="name"
            />
            {errors.name && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.name.path}`}
            </p>}
          </div>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Username</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <input className="input" 
              type="text" 
              placeholder=""
              onChange = {handleChange}
              value = {formData.userName}
              name="userName"
            />
            {errors.userName && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.userName.path}`}
            </p>}
          </div>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Email</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <input className="input" 
              type="text" 
              placeholder=""
              onChange = {handleChange}
              value = {formData.email}
              name="email"
            />
            {errors.email && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.email.path}`}
            </p>}
          </div>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Password</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <input className="input" 
              type="text" 
              placeholder=""
              onChange = {handleChange}
              value = {formData.password}
              name="password"
            />
            {errors.password && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.password.path}`}
            </p>}
          </div>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Confirm Password</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <input className="input" 
              type="text" 
              placeholder=""
              onChange = {handleChange}
              value = {formData.passwordConfirmation}
              name="passwordConfirmation"
            />
            {errors.passwordConfirmation && <p style={{ color: 'red' }}>
              {'Does not match password'}
            </p>}
          </div>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">PostCode</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <input className="input" 
              type="text" 
              placeholder=""
              onChange = {handleChange}
              value = {formData.postcode}
              name="postcode"
            />
            {errors.postcode && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.postcode.path}`}
            </p>}
          </div>
        </div>
      </div>
    </div>

    <div className="control">
      <button className="button is-warning">Sign Up</button>
    </div>

  </form>
}

export default Register