import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapGL, { Marker, Popup } from 'react-map-gl'
import navGram from '../images/nav-ferngram.svg'
import { Link } from 'react-router-dom'

// ! Map Page
// * Centers on Logged in user
// * Map Icons for other users


const UserMap = () => {
  const [userData, updateUserData] = useState([])
  const [longLat, updateLongLat] = useState([])
  const [popupInfo, updatePopupInfo] = useState(null)

  useEffect(() => {
    axios.get('/api/user/users')
      .then(resp => {
        updateUserData(resp.data)
        const promise = []

        resp.data.forEach((user) => {

          promise.push(new Promise((resolve) => {
            setTimeout(() => {
              axios.get(`/api/post-code/${user.postcode}`)
                .then(({ data }) => {
                  const position = {
                    long: data.result.longitude,
                    lat: data.result.latitude,
                    user: user._id,
                    name: user.name,
                    bio: user.bio
                  }
                  resolve(position)
                })
            }, 300)
          }))
          return Promise.all(promise).then((values) => {
            updateLongLat(values)
          })
        })
      })
  }, [])

  console.log(longLat)


  const [viewPort, setViewPort] = useState({
    height: '100vh',
    width: '100vw',
    latitude: 51.515,
    longitude: -0.078,
    zoom: 10
  })

  // ! Issue with mapbox pulling through the correct sizing which we cannot solve. Have used 
  // ! a 'hack' with the style.scss to target just the correct
  return <main>
    <section className="cover">
      <h1>User Map</h1>
    </section>

    <section className="content">
      <section className="margin">
        <div className="mapIcon">
          <MapGL
            {...viewPort}
            mapboxApiAccessToken={'pk.eyJ1IjoicmFjaGVsYmVhbGUiLCJhIjoiY2tobmIyMGNnMDAxcTJ0cGVodGpxMDdjaCJ9.jIEvNHrY6OQ45Q05K2SO_w'}
            // mapStyle="mapbox://styles/rachelbeale/ckhnmobp5103219o01iq25g8x"
            onViewStateChange={(viewPort) => setViewPort(viewPort)}

          >

            {longLat.map(user => {
              return <Marker
                key={user.user}
                latitude={user.lat}
                longitude={user.long}
              >
                <button
                  onClick={event => {
                    event.preventDefault()
                    updatePopupInfo(user)
                  }}
                >
                  <img src={'navGram'} alt={'img'} />
                </button>
              </Marker>
            })}

            {console.log(popupInfo)}

            {popupInfo ? (
              <Popup
                latitude={popupInfo.lat}
                longitude={popupInfo.long}
                onClose={() => {
                  updatePopupInfo(null)
                }}
              >

                <Link to={`/user-page/${popupInfo.user}`}>
                  <h2>{popupInfo.name}</h2>
                  <p>{popupInfo.bio}</p>
                </Link>



              </Popup>
            ) : null}
          </MapGL >
        </div>
      </section>
    </section>
  </main>
}


export default UserMap