import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext);
  // 1.{} => does not calling even API
  // 2.{} => calling API but the api returns an ERROR
  // 3.{} => calling API and the api returns the Data
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading Posts.....</p>}
      {!isLoading && fetchError &&
        <p className='statusMsg' style={{ color: 'red' }}>
          {fetchError}</p>}
      {!isLoading && !fetchError &&
        (searchResults.length ? (<Feed posts={searchResults} />) : (<p style={{ marginTop: "2rem" }}>No posts to display.</p>))}
    </main>
  )
}

export default Home
