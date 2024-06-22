/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react'

const Second = () => {
    const [items, setItems] = useState([]) 
  //   useEffect(() => {
  //     const fetchData = async () => {
  //      const res = await fetch('http://localhost:3000')
  //      const data = await res.json()
  //      setItems(data.items)
  //     }
  //     fetchData()
  //  }, [])


  return (
    <>
    {items.map(i => (
        <p>{i.name}, {i.description} </p>
    ))}
    </>
  )
}

export default Second