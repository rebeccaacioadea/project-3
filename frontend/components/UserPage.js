import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// import { getUserId } from '../lib/auth'
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
  const [userPlants, updateUserPlants] = useState([])

  // * Get request for users plants
  useEffect(() => {
    axios.get(`/api/users-plants/${profileId}`)
      .then(resp => {
        updateUserPlants(resp.data)
        // console.log(resp.data)
      })
  }, [])

  { console.log(userPlants) }


  return <main>
    {/* <h3>Hellow Use page!</h3>
    {userPlants.map((plant, index) => {
      return <h4 key={index}>{plant.commonName}</h4>
    })} */}

    <section className="search-cover">
      <h1>Hello</h1>
    </section>

    <section className="content">
      <section className="margin">
        <h2>User Name</h2>
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
          <div>
            {userPlants.map((plant, index) => {
              return <Link key={index}
                to={`/profile-plant/${plant._id}`} >
                <div style={{ backgroundImage: `url(${plant.image})` }}
                  className="list-item">
                  <h3>{plant.commonName} </h3>
                  <h4>{plant.scientificName}</h4>

                </div>
              </Link>
            })}
          </div>
        </div>
      </section>
    </section>



  </main >



}


export default UserPage