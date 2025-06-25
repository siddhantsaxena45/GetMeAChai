"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { updateProfile, fetchuser } from '@/app/actions/useraction'
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  // Form state
  const [form, setForm] = useState({

    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpay_secret: "",
    razorpay_id: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!session) {
      router.push('/login');
    } else {
      getData(); // only call when session exists
    }
  }, [router, session]);

  const getData = async () => {
    try {
      const u = await fetchuser(session.user.name);
      setForm(u);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }

      const previousUsername = session.user.name;
      const result = await updateProfile(formData, previousUsername);

      if (result?.error) {
        alert(result.error);
      } else {
        toast('Profile Updated', {
          position: "top-left",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });

        // ✅ Update the session
        await update({
          ...session,
          user: {
            ...session.user,
            name: form.username, // set new username
          }
        });
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert("❌ Failed to update profile");
    }
  };




  return (
    <div>
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
      <div className='container mx-auto p-3 md:max-h-[80vh]'>
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white text-center mt-8">Welcome</h2>


        <form className="max-w-sm mx-auto" action={handleSubmit}>

          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
            <input value={form.name ? form.name : ""} onChange={handleChange} type="text" id="name" name="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input value={form.email ? form.email : ""} onChange={handleChange} type="text" id="email" name="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium ">Username</label>
            <input value={form.username ? form.username : ""} onChange={handleChange} type="text" id="username" name="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="profilepic" className="block mb-2 text-sm font-medium">profile picture</label>
            <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" id="profilepic" name="profilepic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="coverpic" className="block mb-2 text-sm font-medium">Cover</label>
            <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" id="coverpic" name="coverpic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="razorpay_secret" className="block mb-2 text-sm font-medium ">RazorPay Secret</label>
            <input value={form.razorpay_secret ? form.razorpay_secret : ""} onChange={handleChange} type="text" id="razorpay_secret" name="razorpay_secret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:boidlue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="razorpay_id" className="block mb-2 text-sm font-medium ">RazorPay id</label>
            <input value={form.razorpay_id ? form.razorpay_id : ""} onChange={handleChange} type="text" id="razorpay_id" name="razorpay_id" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>

          <div>
            <button type="button" onClick={handleSubmit} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full mt-3 ">Submit</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Dashboard
