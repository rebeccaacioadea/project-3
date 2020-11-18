import React, { useState, useEffect } from 'react'
import axios from 'axios'

// * Image 
// * Outdoor plant 
// * Plant type
// * User notes
// * Confirmation button takes you back to personal plant page

const EditPlant = (props) => {
  const plantId = props.match.params.plantId
  const [radioButton, updateRadioButton] = useState()
  const [plantData, updatePlantData] = useState({})

  useEffect(() => {
    console.log(plantId)
    console.log('ID ABOVE')
    axios.get(`/api/plants/${plantId}`)
      .then(resp => {
        updatePlantData(resp.data)
        updateRadioButton(!radioButton)
        console.log(resp.data)

      })

  }, [])

  const [formData, updateFormData] = useState({
    careNotes: '',
    outdoor: false,
    plantType: ''
  })




  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    axios.put(`/api/plants/${plantId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        if (resp.data.errors) return console.log(resp.data.errors)
        props.history.push('/')

      })
    console.log('success')
  }

  function handleRadioButton(event) {
    event.preventDefault()
    updateRadioButton(!radioButton)
    handleChange(event)
  }


<<<<<<< HEAD
  return <form id="editPlant" > 
=======
  return <main>

    <section className="cover">
      <h1>Edit Plant</h1>
    </section>


    <section className="content">
      <section className="margin">
        <h4>{plantData.scientificName}</h4>
        <h2>{plantData.commonName}</h2>
        <div className="header-title extra-space">
          {/* Making left section and right edit icon align center */}
          <div className="header-icon">
            {/* Making 'Messages' and the icon align center */}
            <img src="../images/book.svg" alt="message-icon" />
            <h6>INSERT LIBRARY SCHEMA</h6>
          </div>
          <div>
            <img src="../images/share.svg" alt="edit-icon" />
          </div>
        </div>

        <hr className="hr-less-space" />

        <div className="bio">
          <h5>SYNONYMS</h5>
          <p>Add synonyms to plant schema.</p>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="form-section">
            {radioButton === true ?
              <div className="radio-buttons">
                <button
                  id="button-radio-grow"
                  className="button-radio active"
                  value={true}
                  name="outdoor">
                  <img src="../images/deer-white.svg" alt="deer" />Outdoor</button>
                <button
                  id="button-radio-grow"
                  className="button-radio "
                  onClick={handleRadioButton}
                  value={false}
                  name="outdoor">
                  <img src="../images/fireplace-green.svg" alt="fireplace" />
              Indoor</button>
              </div>
              :
              <div className="radio-buttons">
                <button
                  id="button-radio-grow"
                  className="button-radio"
                  onClick={handleRadioButton}
                  value={true}
                  name="outdoor">
                  <img src="../images/deer-green.svg" alt="deer" />Outdoor</button>
                <button
                  id="button-radio-grow"
                  className="button-radio active"
                  value={false}
                  name="outdoor">
                  <img src="../images/fireplace-white.svg" alt="fireplace" />
              Indoor</button>
              </div>
            }
          </div>


          <div className="form-section">
            <select
              className="plant-type input"
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
          </div>

          <div className="form-section">
            <textarea
              className="input"
              placeholder={plantData.careNotes}
              onChange={handleChange}
              value={formData.careNotes}
              name="careNotes"
            ></textarea>
          </div>
          <button onClick={handleSubmit} className="button-green">Update Plant</button>
        </form>


      </section>
    </section>

  </main>
}

export default EditPlant



{/* <form id="editPlant" onSubmit = { handleSubmit} > 
>>>>>>> development
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
  

  </form> */}