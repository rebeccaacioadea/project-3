import React from 'react'
import { Link } from 'react-router-dom'

// ! Burger for mobile
// ! Navbar for desktop 
// * Home 
// * Map
// * Plant Search 
// * Message Board
// * Full Social Page
// * Messages 
// * Profile 
// * Settings 
// * Logout


const Header = () => {
  /* Set the width of the side navigation to 250px */
  function openNav() {
    document.getElementById('mySidenav').style.width = '300px'
  }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById('mySidenav').style.width = '0'
  }

  return <nav>
    <div id="mySidenav" className="sidenav">
      <a className="closebtn"
        onClick={closeNav}>&times;</a>

      <Link to={'/'}>
        <div className="nav-item">
          <img src={'../images/nav-home.svg'} alt="nav-home" />
          Home
        </div>
      </Link>

      <Link to={'/'}>
        <div className="nav-item">
          <img src={'../images/nav-profile.svg'} alt="nav-profile" />
          Profile
        </div>
      </Link>

      <Link to={'/plant-search'}>
        <div className="nav-item">
          <img src={'../images/nav-search.svg'} alt="nav-search" />
          Plant Search
        </div>
      </Link>

      <Link to={'/user-map'}>
        <div className="nav-item">
          <img src={'../images/nav-map.svg'} alt="nav-map" />
          User Map
        </div>
      </Link>

      <Link to={'/plant-sitters'}>
        <div className="nav-item">
          <img src={'../images/nav-pinboard.svg'} alt="nav-pinboard" />
          Pin Board
        </div>
      </Link>

      <Link to={'/fernstagram'}>
        <div className="nav-item">
          <img src={'../images/nav-ferngram.svg'} alt="nav-ferngram" />
          FernGram
        </div>
      </Link>

      <Link to={'/'}>
        <div className="nav-item">
          <img src={'../images/nav-settings.svg'} alt="nav-settings" />
          Settings
        </div>
      </Link>
    </div>

    <span className="nav-button" onClick={openNav}><img src={'../images/NAV-WHITE.svg'} alt="icon" /></span>

  </nav>
}

export default Header


// const Header = () => {
//   return <nav>
//     <img src={'../images/NAV-WHITE.svg'} alt="icon"/>
//   </nav>
// }