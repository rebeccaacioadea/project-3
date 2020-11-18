import React, { useEffect, useState } from 'react'
import { getUserId } from '../lib/auth'
import axios from 'axios'



const Settings = (props) => {
  const [userData, updateUserData] = useState({})
  const token = localStorage.getItem('token')


  const [radioButton, updateRadioButton] = useState()

  useEffect(() => {
    axios.get(`/api/user/${getUserId()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUserData(resp.data)
        console.log(resp.data)
      })
      .catch(err => console.log(err))
  }, [])


  const [formData, updateFormData] = useState({
    name: `${userData.name}`,
    userName: `${userData.userName}`,
    email: `${userData.email}`,
    password: '',
    passwordConfirmation: '',
    postcode: `${userData.postcode}`,
    image: ''
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
  console.log(formData)


 
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
  }



  return <div className="section">
    <h5> Update your profile</h5>
    {/* <img src="" alt="userImage" /> */}
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

      {/* //! need to addd image---> user should upload their image */}
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

      <button style={{ backgroundColor: 'red'}}
        onClick={handleSubmit}>Update My Profile</button>


    </form>

   
      
  </div>
  


}


export default Settings