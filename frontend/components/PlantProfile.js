import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserId, isCreator } from '../lib/auth'
import axios from 'axios'

const PlantProfile = (props) => {
  // Carrying formData over from addPlant
  const profilePlant = props.location.state.formData

  // Carrying plant ID over from addPlant
  const plantId = props.match.params.plantId

  const token = localStorage.getItem('token')
  const [plantData, updatePlantData] = useState({})

  { console.log(token) }
  
  useEffect(() => {
    axios.get(`/api/plants/${plantId}`)
      .then((resp) => {
        updatePlantData(resp.data)
        console.log(resp.data)
      })
  }, [])

  function handleDelete() {
    axios.delete(`/api/plants/${plantId}`, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then(() => {
        props.history.push('/plant-search')
      })
  }
  return <div>
    <h1>hello plant profile</h1>
    <h1>{profilePlant.commonName}</h1>
    <h1>{profilePlant.scientificName}</h1>
    <img src={profilePlant.image}></img>
    <h1>{profilePlant.outdoor}</h1>
    <h1>{profilePlant.plantType}</h1>
    <h1>Care Notes: {profilePlant.careNotes}</h1>
    <p>Date added to profile</p>
    {isCreator(plantData.user) &&
      <Link to={`/edit-plant/${plantId}`}>Edit plant
      </Link>}
    {isCreator(plantData.user) && <button onClick={handleDelete}
    >Delete Plant </button>}
    <button>Share</button>
  </div>



}

export default PlantProfile