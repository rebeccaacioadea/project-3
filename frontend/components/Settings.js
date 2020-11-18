import React, { useEffect, useState } from 'react'
import { getUserId } from '../lib/auth'
import axios from 'axios'



const Settings = (props) => {
  const userData = props.location.state.user
  const userId = props.match.params.userId

  const [radioButton, updateRadioButton] = useState()

  const [formData, updateFormData] = useState({
    name: `${userData.name}`,
    userName: `${userData.userName}`,
    email: `${userData.email}`,
    password: '',
    passwordConfirmation: '',
    postcode: `${userData.postcode}`,
    image: '',
    bio: ''

  })


  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    updateFormData(data)
    console.log(formData)
  }


  function handleRadioButton(event) {
    event.preventDefault()
    updateRadioButton(!radioButton)
    handleChange(event)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    console.log(token)

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

          <div className="form-section">
            {radioButton === true ?
              <div className="radio-buttons">
                <button
                  id="button-radio-grow"
                  className="button-radio active"
                  value="sitter"
                  name="status">
                  <img src="" alt="" />Sitter</button>
                <button
                  id="button-radio-grow"
                  className="button-radio "
                  onClick={handleRadioButton}
                  value="owner"
                  name="status">
                  <img src="" alt="" />
                Owner</button>
              </div>
              :
              <div className="radio-buttons">
                <button
                  id="button-radio-grow"
                  className="button-radio"
                  onClick={handleRadioButton}
                  value="sitter"
                  name="status">
                  <img src="" alt="" />Sitter</button>

                <button
                  id="button-radio-grow"
                  className="button-radio active"
                  value="owner"
                  name="status">
                  <img src="" alt="" />
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
            <label className="label"><h5>Password</h5></label>
            <input className="input"
              type="text"
              placeholder=""
              onChange={handleChange}
              value={formData.password}
              name="password"
            />
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
          </div>

          <button onClick={handleSubmit} className="button-green">Update</button>

        </form>


      </section>
    </section>
  </main >



}


export default Settings

{/* <div className="section">
    <h5> Update your profile</h5>
    <h1>{`Hello ${userData.name}`} </h1>
    <form onSubmit={handleSubmit} >

      <h5>Status</h5>
      <div className="">
        <div>
          {radioButton === true ?
            <div className="radio-buttons">
              <button
                id="button-radio-grow"
                className="button-radio active"
                value="sitter"
                name="status">
                <img src="" alt="" />Sitter</button>
              <button
                id="button-radio-grow"
                className="button-radio "
                onClick={handleRadioButton}
                value="owner"
                name="status">
                <img src="" alt="" />
                Owner</button>
            </div>
            :
            <div className="radio-buttons">
              <button
                id="button-radio-grow"
                className="button-radio"
                onClick={handleRadioButton}
                value="sitter"
                name="status">
                <img src="" alt="" />Sitter</button>

              <button
                id="button-radio-grow"
                className="button-radio active"
                value="owner"
                name="status">
                <img src="" alt="" />
                Owner</button>
            </div>
          }
        </div>
      </div>

      <div className="form-section">
        <label className="label"><h5>Name</h5></label>
        <input className="input"
          type="text"
          placeholder=""
          onChange={handleChange}
          value={formData.name}
          name="name"
        />
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
      </div>

      <div className="form-section">
        <textarea
          className="input"
          placeholder={userData.bio}
          onChange={handleChange}
          value={formData.bio}
          name="bio"
        ></textarea>
      </div>

      <button style={{ backgroundColor: 'red' }}
        onClick={handleSubmit}>Update My Profile</button>


    </form>

   
      
  </div> */}
