// app/[username]/page.js or wherever your route is
import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import connectDB from '@/db/connectDb';
import { notFound } from 'next/navigation';
import User from '@/models/User';

const Username = async ({ params }) => {
  const { username } = await params;

  const check=async ()=>{
    await connectDB();

    const u = await User.findOne({ username:username });
    if(!u){
      return notFound();
    }
  }
await check();
  return (
    <>
      <PaymentPage username={username} />
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  const { username } = await params;
  return {
    title: `Supporters for ${username}`,
  };
}
