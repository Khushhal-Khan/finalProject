// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Navigate } from 'react-router-dom'

const UnAuth = () => {
   const token = localStorage.getItem("token")
   if(!token){
    return Navigate("/login")
   }
 
}

export default UnAuth