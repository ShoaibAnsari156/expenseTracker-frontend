import React from 'react'
import { Link, NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src="/vite.svg" alt="" />
      <ul>
        <NavLink to="/"><li>Home</li></NavLink>
        <NavLink to={"/about"}><li>About</li></NavLink>
      </ul>
      <button>Get Started</button>
    </div>
  )
}

export default Navbar