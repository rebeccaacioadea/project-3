import React, { useState } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

// * Common name
// * Scientific name 
// * Image 
// * Dui Decimal
// * Synonyms 
// * Add button 
// * Share button 
// * Wish button
// ? Add User Details

// ? Form to add User details before POSTING to list

// ! STILL TO ADD - WISH LIST ICON

const AddPlant = (props) => {
  const plantData = props.location.state.plant

  // UseState to re-create the form to post to OUR plant API
  const [formData, updateFormData] = useState({
    image: `${plantData.image_url}`,
    commonName: `${plantData.common_name}`,
    scientificName: `${plantData.scientific_name}`,
    careNotes: '',
    outdoor: '',
    plantType: ''
  })

  { console.log(formData) }
  { console.log(plantData) }
  { console.log(localStorage.token) }

  // Function to take values from the browser and include in formData
  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    updateFormData(data)
  }

  // Function to POST data to our API 
  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    axios.post('/api/plants', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        const newPlantId = resp.data._id
        props.history.push({ pathname: `/profile-plant/${newPlantId}`, state: { formData } })
        console.log(resp.data._id)
      })
  }

  return <div>
    <div>
      <img src={plantData.image_url}></img>
      <h3>{plantData.scientific_name}</h3>
      <h3>{plantData.common_name}</h3>
      <h5>{plantData.bibliography}</h5>
      <h5>SYNONYMS {plantData.synonyms}</h5>
      <textarea
        placeholder="Care notes for your plant..."
        onChange={handleChange}
        value={formData.careNotes}
        name="careNotes"
      ></textarea>
      <button
        onClick={handleChange}
        value={true}
        name="outdoor"
      >outdoor</button>
      <button
        onClick={handleChange}
        value={false}
        name="outdoor">
        Indoor</button>

      <select
        onChange={handleChange}
        name="plantType">
        <option>Plant Type...</option>
        <option>Bulb</option>
        <option>Cactus/Succulent</option>
        <option>Climber</option>
        <option>Conifer</option>
        <option>Fern</option>
        <option>Fruit</option>
        <option>Herb</option>
        <option>Ornamental</option>
        <option>Grass</option>
        <option>Perennial</option>
        <option>Rose</option>
        <option>Shrub</option>
        <option>Tree</option>
        <option>Palm</option>
        <option>Bamboo</option>
      </select>
      <button onClick={handleSubmit}>Add to my list</button>
    </div>
  </div>
}

export default AddPlant