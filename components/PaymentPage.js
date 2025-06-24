"use client"
import React from 'react'
import Script from 'next/script'
import { useParams } from 'next/navigation'
const PaymentPage = () => {
  const params = useParams();
  const username = params.username;

  const pay=(amount,orderId)=>{
     const options = {
        key: process.env.RAZORPAY_KEY_ID, 
        amount: amount, 
        currency: 'INR',
        name: 'Get Me A Chai',
        description: 'Test Transaction',
        order_id: orderId, // This is the order_id created in the backend
        callback_url: `${process.env.NEXTAUTH_URL}/api/razorpay`,
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div>

        <div className='relative'>
          <img src="/banner.gif" alt="banner" className='w-full h-auto object-cover' />


          <div className='absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 sm:w-36 sm:h-36 overflow-hidden rounded-full ring-4 ring-gray-400'>
            <img
              src="/me.png"
              alt="profile"
              className='object-cover w-full h-full transform scale-210 translate-y-12 -translate-x-10 bg-gray-900'
            />
          </div>
        </div>
      </div>


      <div className='flex flex-col justify-center items-center mt-20 gap-2'>
        <div className='text-xl sm:text-2xl font-bold text-center'>
          @{username}
        </div>
        <div className=' text-center opacity-80'>
          Creator of Get me a chai
        </div>
        <div className='text-center opacity-80'>400 followers . 10 posts . $10 raised</div>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center gap-4 m-4 md:m-10'>
        <div className='w-full md:w-1/2 bg-gray-800 p-10 rounded-3xl md:h-[50vh]'>
          <h3 className='text-4xl font-bold mb-3 text-center'>Supporters</h3>
          <ul className='overflow-y-scroll scrollbar-thin h-[80%]'>
            <li className='mt-2'>
              <div className='flex md:flex-row flex-col justify-center items-center bg-gray-700 p-3 rounded-lg gap-2'>
                <div className='flex gap-2 justify-center items-center'>
                  <div className='w-12 h-12 overflow-hidden rounded-full'>
                    <img src="user.gif" alt="profile" className='object-cover w-full h-full ' />

                  </div>
                  <span className='font-bold'>Username</span>
                </div>
                <div className='flex gap-2 justify-center items-center'>

                  <span>donated</span>
                  <span className='font-bold'>₹2</span>
                  <span>lots of love 🥰 </span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className='w-full md:w-1/2 bg-gray-800 p-10 rounded-3xl md:h-[50vh]'>
          <h3 className='text-2xl font-bold'>Make a donation</h3>
          <div className='flex flex-col justify-center items-center gap-2 my-3'>
            <input type="text" placeholder='Enter your name' className='bg-gray-700 p-3 w-full rounded-lg' />
            <input type="text" placeholder='Enter message' className='bg-gray-700 p-3 w-full rounded-lg' />
            <input type="text" placeholder='Enter amount' className='bg-gray-700 p-3 w-full rounded-lg' />
            <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full">Pay</button>
          </div>
          <div className='flex flex-wrap items-center gap-4 my-3'>
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Pay ₹1</button>
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Pay ₹5</button>
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Pay ₹10</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default PaymentPage
