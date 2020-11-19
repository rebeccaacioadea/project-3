import React, { useState } from 'react'
import axios from 'axios'



const Register = (props) => {
  const [radioButton, updateRadioButton] = useState()


  const [formData, updateFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    postcode: '',
    sitter: false,
    bio: ''
  })

  const [errors, updateErrors] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    postcode: ''

  })

  function handleRadioButton(event) {
    event.preventDefault()
    updateRadioButton(!radioButton)
    handleChange(event)
  }

  function sameButton(event) {
    event.preventDefault()
  }

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
              placeholder="Name"
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
              placeholder="Username"
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
              placeholder="Email"
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
              placeholder="Password"
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
              placeholder="Password Confirmation"
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
              placeholder="Postcode"
              onChange={handleChange}
              value={formData.postcode}
              name="postcode"
            />
            {errors.postcode && <p style={{ color: 'red' }}>
              {`There was a problem with your ${errors.postcode.path}`}
            </p>}
          </div>

          <div className="form-section">
            <label className="label"><h5>Status</h5></label>
            {radioButton === true ?
              <div className="radio-buttons top-space">
                <button
                  id="button-radio-grow"
                  className="button-radio active"
                  onClick={sameButton}
                  value={true}
                  name="sitter">
                  <img src="../images/deer-white.svg" alt="deer" />Sitter</button>
                <button
                  id="button-radio-grow"
                  className="button-radio "
                  onClick={handleRadioButton}
                  value={false}
                  name="sitter">
                  <img src="../images/fireplace-green.svg" alt="fireplace" />
              Owner</button>
              </div>
              :
              <div className="radio-buttons top-space">
                <button
                  id="button-radio-grow"
                  className="button-radio"
                  onClick={handleRadioButton}
                  value={true}
                  name="sitter">
                  <img src="../images/deer-green.svg" alt="deer" />Sitter</button>
                <button
                  id="button-radio-grow"
                  className="button-radio active"
                  onClick={sameButton}
                  value={false}
                  name="sitter">
                  <img src="../images/fireplace-white.svg" alt="fireplace" />
              Owner</button>
              </div>
            }
          </div>

          <div className="form-section">
            <label className="label"><h5>BIO</h5></label>
            <textarea
              className="input"
              placeholder="Tell us about yourself"
              onChange={handleChange}
              value={formData.bio}
              name="bio"
            ></textarea>
          </div>

          <button className="button-green" id="button-grow">Sign Up</button>


        </form>
      </section>
    </section>
  </main>
}

export default Register


