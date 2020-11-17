import React, { useState, useEffect} from 'react'
import axios from 'axios'

// * Image 
// * Outdoor plant 
// * Plant type
// * User notes
// * Confirmation button takes you back to personal plant page

const EditPlant = (props) => {
  const plantId = props.match.params.plantId

  console.log(props)

  const [plantData, updatePlantData] = useState({
    image: '',
    commonName: '',
    scientificName: '',
    careNotes: '',
    outdoor: '',
    plantType: ''

  })

  useEffect(() => {
    axios.get(`/api/plants/${plantId}`)
      .then(resp => {
        updatePlantData(resp.data)
        console.log(resp.data)
      })
  }, [])

  console.log(plantData)

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ... plantData,
      [name]: value
    }
    updatePlantData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    console.log(token)

    axios.put(`/api/plants/${plantId}`, plantData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        if (resp.data.errors) return console.log(resp.data.errors)
        props.history.push('/')
      })
  }


  return <form id="editPlant" > 
    <div>
      <div>
        <div>
          <label>Image</label>
          <input 
            type = "text"
            onChange= { handleChange}
            value = {plantData.image}
            name = "image"
          />
        </div>
        <h2>{plantData.scientificName}</h2>
        <h3> {plantData.commonName}</h3>
 
        <textarea
          placeholder="Care notes for your plant..."
          onChange={handleChange}
          value={plantData.careNotes}
          name="careNotes"
        ></textarea>
        <br />
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
        <button onClick={handleSubmit}>Edit my plant</button>
      </div>
    </div>
  

  </form>
}

export default EditPlant