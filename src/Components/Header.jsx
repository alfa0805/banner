import React, { useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

function Header() {
  const [menyu , setMenyu] = useState(false)
  const menyubtn = () => {
    setMenyu(!menyu)
  }
  return (
    <div className="">
      <div className="fixed z-50 w-[140px] h-[95vh] mt-3 border-2 border-gray-100 rounded-xl  justify-between items-centr
        max-[500px]:flex max-[500px]:border-2 max-[500px]:h-[70px]  max-[500px]:w-full max-[500px]:border-none
        max-[500px]:bg-gray-900 max-[500px]:mt-0 max-[500px]:rounded-none max-[500px]:px-5">
          <h2 className="text-white text-3xl font-bold pl-[15px] py-3">POST
            <span className="text-red-700 text-2xl font-medium">test</span>
          </h2>
          <nav className="flex flex-col pt-5 px-5 gap-3 max-[500px]:hidden">
          <NavLink to="/home"  
              className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link text-white")}>
              Home
            </NavLink>
            <NavLink to="/home/banner"  
              className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link text-white")}>
              Banner
            </NavLink>
          </nav>
          <button 
            className="text-white text-2xl min-[500px]:hidden"
            onClick={menyubtn}
            ><IoMenu /></button>
      </div>
          {
            menyu?
            <nav className="fixed right-0 bg-gray-800 flex flex-col px-5 py-5 pt-[80px] gap-3 border-2 border-gray-100 rounded-xl">
             <NavLink to="/home"  
              className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link text-white")}>
              Home
            </NavLink>
            <NavLink to="/home/banner"  
              className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link text-white")}>
              Banner
            </NavLink>
          </nav>:""
          }
    </div>
  )
}

export default Header