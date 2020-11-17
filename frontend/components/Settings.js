import React, { useEffect, useState } from 'react'
import { getUserId, isCreator} from '../lib/auth'
import axios from 'axios'






const Settings = (props) => {
  const userData = props.location.state.user
  const userId = props.match.params.userId
  console.log(userId)
  console.log(userData)

  console.log(props)

  
  const [formData, updateFormData] = useState({
    name: `${userData.name}`,
    userName: `${userData.userName}`,
    email: `${userData.email}`,
    password: '',
    passwordConfirmation: '',
    postcode: `${userData.postcode}`

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


  //! this to complete this 
  // function handleRadioButton(event) {
  //   event.preventDefault()
  

  // }

  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    console.log(token)

    axios.put(`/api/user/${userId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        if (resp.data.errors) return console.log(resp.data.errors)
        props.history.push('/')
      })
  }



  return <div className="section">
    <h5> Update your profile</h5>
    <h1>{`Hello ${userData.userName}`} </h1>

    <form onSubmit={handleSubmit} >

      //! Need to complete this
      //! Radio-Button 
      {/* <h5>Status</h5>
      <div className="">
        <button
          type = "radio"
          onClick={handleRadioButton}
          value="yes"
          name="type">
            Sitter
        </button>

        <button

          onClick={handleRadioButton}
          value="no"
          name="type">
            Owner
        </button>  
      </div>  */}



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