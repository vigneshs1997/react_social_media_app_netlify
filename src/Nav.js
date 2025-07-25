import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContext'

const Nav = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor='search'>Search Posts</label>
        <input
          id='search'
          type='text'
          placeholder='Search Posts'
          value={search}
          onChange={(e) => { return setSearch(e.target.value) }}
        />
        <ul>
          <li><Link to="/">Home</Link> </li>
          <li><Link to="post">Post</Link></li>
          <li><Link to="about">About</Link></li>
        </ul>
      </form>
    </nav>
  )
}

export default Nav
