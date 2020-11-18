import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapGL, { Marker, Layer, Feature } from 'react-map-gl'

// ! Map Page
// * Centers on Logged in user
// * Map Icons for other users


const UserMap = () => {
  // const mapboxToken = process.env.mapboxToken
  const [userData, updateUserData] = useState([])
  const [longLat, updateLongLat] = useState([])

  // console.log(mapboxToken)

  useEffect(() => {
    // function getUser() {
    axios.get('/api/user/users')
      .then(resp => {
        updateUserData(resp.data)
        const promise = []
        // console.log(resp.data)

        resp.data.forEach((user) => {

          promise.push(new Promise((resolve) => {
            setTimeout(() => {
              axios.get(`/api/post-code/${user.postcode}`)
                .then(({ data }) => {
                  const position = {
                    long: data.result.longitude,
                    lat: data.result.latitude,
                    user: user._id,
                    name: user.name
                  }
                  console.log(position)
                  resolve(position)
                })
            }, 300)
          }))
          return Promise.all(promise).then((values) => {
            updateLongLat(values)
            console.log(values)
          })
        })
      })
  }, [])

  console.log(longLat)


  const [viewPort, setViewPort] = useState({
    height: '100vh',
    width: '100vw',
    zoom: 10,
    latitude: 51.515,
    longitude: -0.078
  })

  return <MapGL
    mapboxApiAccessToken={'pk.eyJ1Ijoibmlja2hheWVzIiwiYSI6ImNrYmh2dW56NDA5ZnIyenB2MHJ4MGFnaWYifQ.IHXzZRvdxBtuH9Ro6nLKmQ'}
    {...viewPort}
    onViewStateChange={(viewPort) => setViewPort(viewPort)}
    mapStyle={'mapbox://styles/mapbox/streets-v11'}
  >
    {longLat.map(user => {
      return <Marker
        key={user.user}
        latitude={user.lat}
        longitude={user.long}
      >
        <div>
          <span>{user.name}</span>
          <img width={20} height={20} src={'../images/pine-tree'} alt={'user'} />
        </div>
      </Marker>
    })}
  </MapGL>
}


export default UserMap