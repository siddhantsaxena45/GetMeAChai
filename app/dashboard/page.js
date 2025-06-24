"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect , useState, useRef} from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'; 

const dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  
  // Form state
  const [form, setForm] = useState({
    id: "",
    name: "",
    emailid: "",
    username: "",
    profile: "",
    cover: "",
    razorpay_secret: "",
    razorpay_id: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form submitted:", form);
    // You can send this data to your backend API
  };

  console.log("Client-side session:", session); 
  return (
    <div>
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center mt-8">Welcome</h2>
      <div className='container mx-auto p-3'>


        <form className="max-w-sm mx-auto">

          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input value={form.name?form.name:""} onChange={handleChange} type="text" id="name" name= "name"  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
           <div>
            <label htmlFor="emailid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input value={form.emailid?form.emailid:""} onChange={handleChange} type="text" id="emailid" name= "emailid"  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
           <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input value={form.username?form.username:""} onChange={handleChange} type="text" id="username" name= "username"  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
         <div>
            <label htmlFor="profile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">profile picture</label>
            <input value={form.profile?form.profile:""} onChange={handleChange} type="text" id="profile" name= "profile"  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover</label>
            <input value={form.cover?form.cover:""} onChange={handleChange} type="text" id="cover" name= "cover"  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="razorpay_secret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RazorPay Secret</label>
            <input value={form.razorpay_secret?form.razorpay_secret:""} onChange={handleChange} type="text" id="razorpay_secret" name="razorpay_secret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:boidlue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="razorpay_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RazorPay id</label>
            <input value={form.razorpay_id?form.razorpay_id:""} onChange={handleChange} type="text" id="razorpay_id" name="razorpay_id" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>

          <div>
            <button type="button" onClick={handleSubmit} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full mt-3 ">Submit</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default dashboard
