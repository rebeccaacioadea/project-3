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

  // * GETting data from API. 
  const searchFunction = (query) => {
    axios.get(`api/plants-external/${query}`)
      .then(resp => {
        updateResults(resp.data.data)
      })
  }

  // console.log(results)
  useEffect(() => {
    return searchFunction(query)
  }, [query])

  // * Function to search results when enter button pressed
  function enterKey(event) {
    if (event.key === 'Enter') {
      updateQuery(typedWord)
      // console.log(query)
    }
  }

  return <main className="main">
    <section className="search-cover">
      <h1>Plant <br /> Library</h1>
      <input className="search-bar"
        placeholder="Search"
        onChange={(event) => updateTypedWord(event.target.value)}
        value={typedWord}
        onKeyPress={enterKey}
      // {...console.log(typedWord)}
      />
      {/* <button className="search-button"
        onClick={() => {
          updateQuery(typedWord)
          console.log(query)
        }}>
      </button> */}
    </section>

    <section className="content" id="content-search">
      <section className="margin" id="search-margin">
        {/* <div>
          <div> */}
        {results.map((plant, index) => {
          return <Link key={index}
            to={{ pathname: `/add-plant/${plant.id}`, state: { plant } }} >
            <div style={{ backgroundImage: `url(${plant.image_url})` }}
              className="list-item" id="search-profile">
              <h3>{plant.common_name} </h3>
              <h4>{plant.scientific_name}</h4>
            </div>
          </Link>
        })}
        {/* </div>
        </div> */}
      </section>
    </section>
  </main>
}

export default PlantSearch