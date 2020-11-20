import React, { useState } from 'react'
import axios from 'axios'

// * Standard Login Form (Pre populate?)
// * Once logged in -> Link to Home

const Login = (props) => {

  const [formData, updateFormData] = useState({
    userName: '',
    password: ''
  })
  const [errors, updateErrors] = useState('')
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
      // .then(() => {
      //   location.reload()
      // })
      .catch(error => {
        console.log(error)
        updateErrors(error)
        return error 
      })
  }

// console.log(errors)

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
          {errors && <p className ="errorMessages" style={{ color: 'red' }}>
            {'Invalid username or password' }
          </p>}
          <a href="/" onClick={handleSubmit} className="button-green"><button className="button-green">LOGIN</button></a>
        </form>
      </section>
    </section>

  </main>
}

export default Login
