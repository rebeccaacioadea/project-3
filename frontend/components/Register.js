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

    axios.post('/api/user/register', formData)
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

  return <main>
    <section className="cover">
      <h1>Register</h1>
    </section>

    <section className="content" id="register">
      <section className="margin">

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label className="label"><h5>Name</h5></label>
            <input className="input"
              type="text"
              placeholder="Type Here"
              onChange={handleChange}
              value={formData.name}
              name="name"
            />
            {errors.name && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.name.path}`}
            </p>}
          </div>

          <div className="form-section">
            <label className="label"><h5>Username</h5></label>
            <input className="input"
              type="text"
              placeholder=""
              onChange={handleChange}
              value={formData.userName}
              name="userName"
            />
            {errors.userName && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.userName.path}`}
            </p>}
            {errors.name && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.name.path}`}
            </p>}
          </div>


          <div className="form-section">
            <label className="label"><h5>Email</h5></label>
            <input className="input"
              type="text"
              placeholder=""
              onChange={handleChange}
              value={formData.email}
              name="email"
            />
            {errors.email && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.email.path}`}
            </p>}
          </div>

          <div className="form-section">
            <label className="label"><h5>Password</h5></label>
            <input className="input"
              type="text"
              placeholder=""
              onChange={handleChange}
              value={formData.password}
              name="password"
            />
            {errors.password && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.password.path}`}
            </p>}
          </div>

          <div className="form-section">
            <label className="label"><h5>Confirm Password</h5></label>
            <input className="input"
              type="text"
              placeholder=""
              onChange={handleChange}
              value={formData.passwordConfirmation}
              name="passwordConfirmation"
            />
            {errors.passwordConfirmation && <p style={{ color: 'red' }}>
              {'Does not match password'}
            </p>}
          </div>


          <div className="form-section">
            <label className="label"><h5>Postcode</h5></label>
            <input className="input"
              type="text"
              placeholder=""
              onChange={handleChange}
              value={formData.postcode}
              name="postcode"
            />
            {errors.postcode && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.postcode.path}`}
            </p>}
          </div>

          <button className="button-green" id="register-button">Sign Up</button>


        </form>
      </section>
    </section>
  </main>
}

export default Register


