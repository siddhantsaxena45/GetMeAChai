"use client"
import React from 'react'
import Script from 'next/script'
import { useState } from 'react'
import { initiate } from '@/app/actions/useraction'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
const PaymentPage = ({ username }) => {


  const [paymentform, setPaymentform] = useState({
    name: '',
    message: '',
    amount: ''
  });

  const [orderId, setOrderId] = useState("");

  const { data: session } = useSession();
  const possible2 = !paymentform.name ||
    !paymentform.message ||
    isNaN(paymentform.amount) || !paymentform.amount
  const possible = !paymentform.name ||
    !paymentform.message ||
    isNaN(paymentform.amount) 
    
  const [userData, setUserData] = useState(null);
  const [supporters, setSupporters] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {

    if (searchParams.get("paymentdone") === "true") {
      toast('Payment successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    router.push(`/${username}`);

  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/supporters?username=${username}`);
      const data = await res.json();

      setUserData(data.user);
      setSupporters(data.payments);
    };

    fetchData();
  }, [username]);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }

  const totalRaised = supporters.reduce((sum, s) => sum + Number(s.amount || 0), 0);

  const pay = async (amount) => {
    if ( isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const order = await initiate(amount, username, paymentform);
      setOrderId(order.id);

      const options = {
        // key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key: userData.razorpay_id,
        amount: order.amount,
        currency: 'INR',
        name: 'Get Me A Chai',
        description: 'Support a creator',
        order_id: order.id,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        prefill: {
          name: paymentform.name || '',
          email: session?.user?.email || '',
          contact: '',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Failed to initiate payment.");
    }

  };
  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div>

        <div className='relative'>
          <img src="/banner.gif" alt="banner" className='w-full h-auto object-cover' />

          <div className='absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 sm:w-36 sm:h-36 overflow-hidden rounded-full ring-4 ring-gray-400'>
            <img src={userData?.profilepic || "/chai.gif"} alt="profilepic" className='w-full h-full object-cover bg-gray-900' />

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
        <div className='text-center opacity-80'>{supporters.length} supporter{supporters.length !== 1 && 's'} | ₹{totalRaised} raised</div>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center gap-4 m-4 md:m-10'>
        <div className='w-full md:w-1/2 bg-gray-800 p-10 rounded-3xl md:h-[50vh]'>
          <h3 className='text-4xl font-bold mb-3 text-center'>Supporters</h3>

          <ul className='overflow-y-scroll scrollbar-thin h-[80%]'>
            {supporters.length === 0 ? (
              <li className='text-center mt-4 text-gray-400'>No supporters yet</li>
            ) : (
              supporters.map((s, i) => (
                <li key={i} className='mt-2'>
                  <div className='flex md:flex-row flex-col justify-center items-center bg-gray-700 p-3 rounded-lg gap-2'>
                    <div className='flex gap-2 justify-center items-center'>
                      <div className='w-12 h-12 overflow-hidden rounded-full'>
                        <img src="/user.gif" alt="profile" className='object-cover w-full h-full ' />
                      </div>
                      <span className='font-bold'>{s.name || "Anonymous"}</span>
                    </div>
                    <div className='flex gap-2 justify-center items-center'>
                      <span>donated</span>
                      <span className='font-bold'>₹{s.amount}</span>
                      {s.message && <span>“{s.message}”</span>}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>

        </div>

        <div className='w-full md:w-1/2 bg-gray-800 p-10 rounded-3xl md:h-[50vh]'>
          <h3 className='text-2xl font-bold text-center'>Make a donation</h3>
          <div className='flex flex-col justify-center items-center gap-2 my-3'>
            <input onChange={handleChange} value={paymentform.name} name="name" type="text" placeholder='Enter your name' className='bg-gray-700 p-3 w-full rounded-lg' />
            <input onChange={handleChange} value={paymentform.message} name="message" type="text" placeholder='Enter message' className='bg-gray-700 p-3 w-full rounded-lg' />
            <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" placeholder='Enter amount' className='bg-gray-700 p-3 w-full rounded-lg' />
            <button onClick={() => pay(paymentform.amount)} type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 text-center w-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={possible2 } >Pay</button>
          </div>
          <div className='flex justify-center  items-center gap-4 '>
            <button onClick={() => pay(10)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"  disabled={possible}>Pay ₹10</button>
            <button onClick={() => pay(20)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed" disabled={possible}>Pay ₹20</button>
            <button onClick={() => pay(30)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed" disabled={possible}>Pay ₹30</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default PaymentPage
