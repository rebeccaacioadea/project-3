import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import { Link } from 'react-router-dom'


// ! This is the landing page
// * Hero/background
// * Login/Register buttons
// * About Us

// ? Limited functionality if you're not logged in



const Home = () => {

  const [user, updateUser] = useState([])
  const [userPlants, updateUserPlants] = useState([])

  const token = localStorage.getItem('token')

  if (!token) return <main>
    <section className="cover">
      <h1>Welcome</h1>
    </section>
    <section className="content">
      <section className="margin">
        <h4>
          Welcome to Seeded! A platform dedicated to help users find plant sitters
        </h4>
      </section>
    </section>
  </main>

  useEffect(() => {
    
    axios.get(`api/user/${getUserId()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUser(resp.data)
        console.log(typeof resp.data._id)
      })
      .then(()=> {
        getPlantList()
        console.log('it worked')
      })
      .catch(err => console.log(err))
  }, [])

  const getPlantList = () => {
    console.log(user._id)

    axios.get(`api/users-plants/${user._id}`)
      .then(resp => {
        updateUserPlants(resp.data)
        console.log(resp.data)
      })
      .catch(err => console.log(err))
  }


  return <main>
    <section className="cover">
      <h1>Welcome</h1>
    </section>

    <section className="content">
      <section className="margin">
        <h2>{user.name}</h2>
        <div className="header-title">
          {/* Making left section and right edit icon align center */}
          <div className="header-icon">
            {/* Making 'Messages' and the icon align center */}
            <img src="./images/messages.svg" alt="message-icon" />
            <h6>Messages</h6>
          </div>
          <div>
            <img src="./images/edit.svg" alt="edit-icon" />
          </div>
        </div>

        <section className="status">
          <div>
            <img src="./images/badge.svg" alt="badge-icon" />
            <h5>Support<br />Badge</h5>
          </div>
          <img src="./images/vertical-line.svg" alt="vertical-line" />
          <div>
            <img src="./images/plantpot.svg" alt="flower-in-pot" />
            <h5>Looking<br />For</h5>
          </div>
          <img src="./images/vertical-line.svg" alt="vertical-line" />
          <div>
            <h1>{userPlants.length}</h1>
            <h5>Plant<br />Count</h5>
          </div>
        </section>

        <hr />
        <section className="list">
          <Link to={`/user-page/${user._id}`}>
            <div className="list-item" id="home-profile">
              <img src="./images/profile.svg" alt="profile" />
              <h3>Profile</h3>
            </div>
          </Link>
          <Link to={'/plant-search'}>
            <div className="list-item" id="home-search">
              <img src="./images/magnifying.svg" alt="magnifying" />
              <h3>Plant Search</h3>
            </div>
          </Link>
          <Link to={'/user-map'}>
            <div className="list-item" id="home-map">
              <img src="./images/map.svg" alt="map" />
              <h3>User Map</h3>
            </div>
          </Link>
          <Link to={'/fernstagram'}>
            <div className="list-item" id="home-ferngram">
              <img src="./images/leaves.svg" alt="leaves" />
              <h3>FernGram</h3>
            </div>
          </Link>
          <Link to={'/plant-sitters'}>
            <div className="list-item" id="home-pinboard">
              <img src="./images/pinboard.svg" alt="pinboard" />
              <h3>Pin Board</h3>
            </div>
          </Link>
        </section>

      </section>
    </section>
  </main>
}

export default Home