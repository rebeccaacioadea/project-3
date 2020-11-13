import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


// * Title
// * Search Bar
// * List of Plants

// ? Plant Cards
// * Link to add to profile

const PlantSearch = () => {
  const [results, updateResults] = useState([])
  const [query, updateQuery] = useState('')
  const [typedWord, updateTypedWord] = useState('')

  const searchFunction = (query) => {
    axios.get(`api/plants-external/${query}`)
      // axios.get('api/plants-external/coconut')
      .then(resp => {
        updateResults(resp.data.data)
        // console.log(resp.data.data)
      })
  }

  console.log(results)
  useEffect(() => {
    return searchFunction(query)
  }, [query])


  return <div>
    <input
      placeholder="Search"
      onChange={(event) => updateTypedWord(event.target.value)}
      value={typedWord}
      {...console.log(typedWord)}
    />
    <button
      onClick={() => {
        updateQuery(typedWord)
        console.log(query)
      }}>Search
    </button>

    <div>
      {results.map((plant, index) => {
        return <Link key={index}
          to={{ pathname: `/add-plant/${plant.id}`, state: { plant } }} >
          <div>
            <h2>{plant.common_name} </h2>
            <h3>{plant.scientific_name}</h3>
            <img src={plant.image_url}></img>
          </div>
        </Link>
      })}
    </div>
  </div>
}

export default PlantSearch