import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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


const AddPlant = (props) => {
  const plantData = props.location.state.plant


  // Pushing the data to our API when ADD button is click: 
  const [formData, updateFormData] = useState({
    image: '',
    commonName: `${plantData.common_name}`,
    scientificName: `${plantData.scientific_name}`,
    careNotes: '',
    outdoor: '',
    plantType: ''
  })
  const inputFields = ['image', 'commonName', 'scientificName', 'careNotes', 'outdoor', 'plantType']

  // const [text, setText] = useState('')
  { console.log(formData) }

  function handleChange(event) {
    const data = {
      ...formData,
      [name]: event.target.value
    }
    updateFormData(data)
  }

  // function handleSubmit(event) {
  //   event.preventDefault()
  //   axios.post('api/plants', formData)
  //     .then(resp => {
  //       props.history.push('/plant-search')
  //     })
  // }

  return <div>
    <div>
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
    </div>





  </div>




}

export default AddPlant