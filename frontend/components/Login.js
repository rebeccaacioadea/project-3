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


  return <main>
    <section className="cover">
      <h1>Login</h1>
    </section>

    <section className="content" id="register">
      <section className="margin">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label className="label"><h5>Username</h5></label>
            <input className="input"
              type="text"
              placeholder="Type Here"
              onChange={handleChange}
              value={formData.userName}
              name="userName"
            />
          </div>
          <div className="form-section">
            <label className="label"><h5>Password</h5></label>
            <input className="input"
              type="text"
              placeholder="Type Here"
              onChange={handleChange}
              value={formData.password}
              name="password"
            />
          </div>
          <button className="button-green" id="register-button">Sign Up</button>
        </form>
      </section>
    </section>

  </main>
}

export default Login


{/* <form className="login" onSubmit={handleSubmit} >
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
   
  </form> */}