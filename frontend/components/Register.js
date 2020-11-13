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
  // const [errors, updateErrors] = useState({
  //   name: '',
  //   username: '',
  //   email: '',
  //   password: '',
  //   passwordConfirmation: '',
  //   postCode: ''
 
  // })

  

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }

    // const newErrors = {
    //   ...errors,
    //   [name]: ''
    // }

    updateFormData(data)
    // updateErrors(newErrors)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api//user/register', formData)
      .then(resp => {
        console.log(resp.data)
        // if (resp.data.errors) {
        //   updateErrors(resp.data.error)
        // } else {
          props.history.push('/user/login')
        // }
         
       

      })
  }
  
  return <form onSubmit={handleSubmit}>
    <h1> Create Account</h1>
    <div>
      <div>
        <label>Full Name</label>
        <input
          type = "text"
          onChange = {handleChange}
          value = {formData.name}
          name="name"
          placeholder = "Name"
        />
        {/* {errors.name && <p style={{ color: 'red' }}>
          {`There was a problem with your ${errors.name.path}`}
        </p>} */}
      </div>
      <div>
        <label>Username</label>
        <input
          type = "text"
          onChange = {handleChange}
          value = {formData.userName}
          name="userName"
          placeholder = "UserName"
        />
        {/* {errors.username && <p style={{ color: 'red' }}>
          {`There was a problem with your ${errors.username.path}`}
        </p>} */}
  
      </div>
      <div>
        <label>Email</label>
        <input
          type = "text"
          onChange = {handleChange}
          value = {formData.email}
          name="email"
          placeholder = "Email"
        />
        {/* {errors.email && <p style={{ color: 'red' }}>
          {`There was a problem with your ${errors.email.path}`}
        </p>} */}
      </div>
      <div>
        <label>Password</label>
        <input
          type = "text"
          onChange = {handleChange}
          value = {formData.password}
          name="password"
          placeholder = "Password"
        />
        {/* {errors.password && <p style={{ color: 'red' }}>
          {`There was a problem with your ${errors.password.path}`}
        </p>} */}
      </div>
      
      <div>
        <label>Confirm Password</label>
        <input
          type = "text"
          onChange = {handleChange}
          value = {formData.passwordConfirmation}
          name="passwordConfirmation"
          placeholder = "Confirm Password"
        />
        {/* {errors.passwordConfirmation && <p style={{ color: 'red' }}>
          {'Does not match password'}
        </p>} */}
      </div>
    </div>
    <div>
      <label>PostCode</label>
      <input
        type = "text"
        onChange = {handleChange}
        value = {formData.postcode}
        name="postcode"
        placeholder = "postcode"
      />
      {/* {errors.postCode && <p style={{ color: 'red' }}>
        {`There was a problem with your ${errors.postCode.path}`}
      </p>} */}
      
    </div>
    <button>Create Account</button>
    

  </form>
}

export default Register