import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
// ! User Page
// * Name 
// * Image
// * Badges 
// * Status 
// * Plant count 
// * User bio 
// * Contact button 
// * List of the users plants 

// ? Ability to see users plants and posts
// ? Link to add more plants
// ? Link to see messages


const UserPage = (props) => {
  const [currentUser, updateCurrentUser] = useState({})
  const token = localStorage.getItem('token')
  const profileId = props.match.params.userId
  // const [profilePlants, profilePlants] = useState({})

  // useEffect(() => {
  axios.get(`/api/user/${getUserId()}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(resp => {
      updateCurrentUser(resp.data)
      console.log(resp.data)
    })
  // }, [])


  // axios.get(`api/users/plants/${profileId}`)
  //   .then(resp => {
  //     profilePlants(resp.data)
  //     console.log(resp.data)
  //   })

  return <main>
    <h3>{currentUser.name}</h3>

  </main>



}


export default UserPage