import React from 'react'

const Footer = () => {
  const curryear=new Date().getFullYear()
    return (
        <div className='flex justify-center items-center p-4 bg-blue-950 text-white'>
          <p >Copyright &copy; {curryear} | All rights reserved </p>

        </div>
    )
}

export default Footer
