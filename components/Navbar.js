"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
const Navbar = () => {
  const { data: session } = useSession()

  const [showdropdown, setshowdropdown] = useState(false)
  return (
    <div className='flex justify-between items-center px-4 py-2 bg-blue-950 text-white'>
      <Link href="/"><div className="flex justify-center items-center">  <div className="w-16"><img src="./chai.gif" alt="" /></div><div className="text-2xl font-bold">Get me a chai</div>
      </div>
      </Link>

      <div className='flex gap-4 relative'>

        {
          session && (
            <>

              <button onClick={() => { setshowdropdown(!showdropdown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-[40px]" type="button">Dropdown<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
              </button>


             <div
  id="dropdown"
  className={`absolute z-20 ${showdropdown ? "block" : "hidden"} top-12 right-0 md:right-[0px] bg-white dark:bg-gray-700 rounded-lg shadow-md w-full md:w-44 min-w-[10rem] overflow-hidden transition-all`}
>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                  </li>
                  <li>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                  </li>
                  
                  <li>
                    <Link onClick={() => { signOut() }} href="" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                  </li>
                </ul>
              </div>




              <button onClick={() => signOut()} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>

            </>
          )}

        {!session && (
          <>
            <Link href={'/login'}>
              <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button></Link>
          </>
        )}


      </div>
    </div>
  )
}

export default Navbar
