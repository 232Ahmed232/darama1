import React from 'react'
import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom';

function Home() {
    const user = useSelector((state)=>state.auth.userData)
    console.log(useRoutes);
    
  return (
    <div>
        <h1>Home pAge</h1>
    </div>
  )
}

export default Home