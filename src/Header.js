import React, { useContext } from 'react'
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'
import DataContext from './context/DataContext'
const Header = ({ title }) => {//Prop drilling
  const { width } = useContext(DataContext);
  return (
    
    <header className='Feader'>
      <h1>{title}</h1> 
      {
        width < 768 ? <FaMobileAlt />
          : width < 992 ? <FaTabletAlt />
            : <FaLaptop />
      }
    </header>
  )
}

export default Header
