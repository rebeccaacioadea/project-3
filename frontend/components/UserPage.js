import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId, isCreator } from '../lib/auth'

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
  const [userInfo, updateUserInfo] = useState({})
  const token = localStorage.getItem('token')
  const profileId = props.match.params.userId
  const [userPlants, updateUserPlants] = useState([])
  const [radioButton, updateRadioButton] = useState()

  // * Get request for users plants
  useEffect(() => {
    axios.get(`/api/users-plants/${profileId}`)
      .then(resp => {
        updateUserPlants(resp.data)
      })
    axios.get(`/api/user/${profileId}`)
      .then(resp => {
        updateUserInfo(resp.data)
      })
  }, [])


  function handleRadioButton(event) {
    event.preventDefault()
    updateRadioButton(!radioButton)
  }

  return <main>
    <section className="search-cover">
      <h1>Hello</h1>
    </section>

    <section className="content">
      <section className="margin">
        <h2>{userInfo.name}</h2>
        <div className="header-title">
          {/* Making left section and right edit icon align center */}
          <div className="header-icon">
            {/* Making 'Messages' and the icon align center */}
            <img src="../images/messages.svg" alt="message-icon" />
            <h6>Messages</h6>
          </div>
          <div>
            <img src="../images/edit.svg" alt="edit-icon" />
          </div>
        </div>

        <section className="status">
          <div>
            <img src="../images/badge.svg" alt="badge-icon" />
            <h5>Support<br />Badge</h5>
          </div>
          <img src="../images/vertical-line.svg" alt="vertical-line" />
          <div>
            <img src="../images/plantpot.svg" alt="flower-in-pot" />
            <h5>Looking<br />For</h5>
          </div>
          <img src="../images/vertical-line.svg" alt="vertical-line" />
          <div>
            <h1>{userPlants.length}</h1>
            <h5>Plant<br />Count</h5>
          </div>
        </section>
        <hr />

        <div>
          <div className="bio">
            <h5>Bio</h5>
            <p>Bio goes here TO MAP WHEN USER SCHEMA HAS BEEN UPDATED</p>
          </div>

          <div className="form-Section">
            {radioButton === true ?
              <div>
                <div className="radio-buttons">
                  <button
                    id="button-radio-grow"
                    className="button-radio active">
                    <img src="../images/round-flower-white.svg" alt="flower"></img>
                  Plants
                  </button>
                  <button
                    id="button-radio-grow"
                    className="button-radio"
                    onClick={handleRadioButton}>
                    <img src="../images/camera-green.svg" alt="camera"></img>
                  Posts
                  </button>
                </div>
                {isCreator(userInfo._id) && <Link to={'/plant-search'}>
                  <div className="button-green button-addPlant">Add New plant</div>
                </Link>}
                {userPlants.map((plant, index) => {
                  return <Link key={index}
                    to={`/profile-plant/${plant._id}`} >
                    <div style={{ backgroundImage: `url(${plant.image})` }}
                      className="list-item" id="search-profile">
                      <h3>{plant.commonName} </h3>
                      <h4>{plant.scientificName}</h4>
                    </div>
                  </Link>
                })}

              </div>
              :
              <div className="radio-buttons">
                <button
                  id="button-radio-grow"
                  className="button-radio"
                  onClick={handleRadioButton}>
                  <img src="../images/round-flower-green.svg" alt="flower"></img>
                  Plants
                </button>
                <button
                  id="button-radio-grow"
                  className="button-radio active">
                  <img src="../images/camera-white.svg" alt="camera"></img>
                  Posts
                </button>
              </div>
            }

          </div>
        </div>
      </section>
    </section>
  </main >
}


export default UserPage