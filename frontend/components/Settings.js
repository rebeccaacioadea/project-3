import React, { useState } from 'react'
import { getUserId } from '../lib/auth'
import axios from 'axios'
import chairwhite from '../images/chair-white.svg'
import chairgreen from '../images/chair-green.svg'
import flowerpotwhite from '../images/flowerpot-white.svg'
import flowerpotgreen from '../images/flowerpot-green.svg'


const Settings = (props) => {
  const userData = props.location.state.user
  // const userId = props.match.params.userId

  const [radioButton, updateRadioButton] = useState(userData.sitter)

  const [formData, updateFormData] = useState({
    name: `${userData.name}`,
    userName: `${userData.userName}`,
    email: `${userData.email}`,
    password: '',
    passwordConfirmation: '',
    postcode: `${userData.postcode}`,
    image: '',
    bio: `${userData.bio}`,
    sitter: `${userData.sitter}`
  })



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
    updateFormData(data)
  }


  function handleRadioButton(event) {
    event.preventDefault()
    updateRadioButton(!radioButton)
    handleChange(event)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    axios.put(`/api/user/${getUserId()}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        if (resp.data.errors) return console.log(resp.data.errors)
        props.history.push('/')
      })
      .then(() => {
        location.reload()
      })
  }



  return <main>
    <section className="cover">
      <h1>Settings</h1>
    </section>


    <section className="content">
      <section className="margin">
        <h2>{userData.name}</h2>


        <form onSubmit={handleSubmit}>

          <div className="form-section extra-space">
            <label className="label"><h5>Status</h5></label>
            {radioButton === true ?
              <div className="radio-buttons top-space">
                <button
                  className="button-radio active"
                  onClick={sameButton}
                  value={true}
                  name="sitter">
                  <img src={chairwhite} alt="chair" />Sitter</button>
                <button
                  className="button-radio"
                  onClick={handleRadioButton}
                  value={false}
                  name="sitter">
                  <img src={flowerpotgreen} alt="flowerpot" />
                Owner</button>
              </div>
              :
              <div className="radio-buttons top-space">
                <button
                  className="button-radio"
                  onClick={handleRadioButton}
                  value={true}
                  name="sitter">
                  <img src={chairgreen} alt="chair" />Sitter</button>

                <button
                  onClick={sameButton}
                  className="button-radio active"
                  value={false}
                  name="sitter">
                  <img src={flowerpotwhite} alt="flowerpot" />
                Owner</button>
              </div>
            }
          </div>

          <div className="form-section">
            <label className="label"><h5>Name</h5></label>
            <input className="input"
              type="text"
              placeholder={userData.name}
              onChange={handleChange}
              value={formData.name}
              name="name"
            />
          </div>

          <div className="form-section">
            <label className="label"><h5>Email</h5></label>
            <input className="input"
              type="text"
              placeholder={userData.email}
              onChange={handleChange}
              value={formData.email}
              name="email"
            />
          </div>

          <div className="form-section">
            <label className="label"><h5>Postcode</h5></label>
            <input className="input"
              type="text"
              placeholder={userData.postcode}
              onChange={handleChange}
              value={formData.postcode}
              name="postcode"
            />
          </div>

          <div className="form-section">
            <label className="label"><h5>BIO</h5></label>
            <textarea
              className="input"
              placeholder={userData.bio}
              onChange={handleChange}
              value={formData.bio}
              name="bio"
            ></textarea>
          </div>

          <div className="form-section">
            <label className="label"><h5>Password</h5></label>
            <input className="input"
              type="password"
              placeholder=""
              onChange={handleChange}
              value={formData.password}
              name="password"
            />
          </div>

          <div className="form-section">
            <label className="label"><h5>Confirm Password</h5></label>
            <input className="input"
              type="password"
              placeholder=""
              onChange={handleChange}
              value={formData.passwordConfirmation}
              name="passwordConfirmation"
            />
          </div>

          <button onClick={handleSubmit} className="button-green">Update</button>

        </form>


      </section>
    </section>
  </main >



}


export default Settings