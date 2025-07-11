import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const curryear=new Date().getFullYear()
    return (
        <div className='flex justify-center items-center p-4 bg-blue-950 text-white gap-4 flex-wrap'>
          <p >Copyright &copy; {curryear} | All rights reserved </p>
          <p className='flex'>
          <Link href={'/privacy'}><p className='ms-2 hover:underline hover:cursor-pointer'>Privacy Policy</p></Link>
          <Link href={'/terms'}><p className='ms-2 hover:underline hover:cursor-pointer'>Terms & Conditions</p></Link>
          <Link href={'/contact'}><p className='ms-2 hover:underline hover:cursor-pointer'>Contact Us</p></Link>
          </p>

        </div>
    )
}

export default Footer
