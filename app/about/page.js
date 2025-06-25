import React from 'react';

const About = () => {
  return (
    <div className=" p-6  text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">About Get Me A Chai</h1>
        <p className="text-lg leading-7 text-gray-300 mb-6">
          Get Me A Chai is a simple fundraising platform built to support creators, developers, and dreamers. Whether you’re building open-source projects, creating content, or doing anything valuable — this platform helps your supporters show appreciation with a small contribution (like buying you a chai ☕).
        </p>
        <p className="text-lg leading-7 text-gray-300 mb-6">
          Supporters can leave messages, contribute any amount they want, and see their names listed to show their support. It's fast, easy, and all payments are powered securely by Razorpay.
        </p>
        <p className="text-lg leading-7 text-gray-300">
          Thank you for being part of a generous community that values creators. Let's keep building amazing things together!
        </p>
      </div>
    </div>
  );
};

export default About;

export const metadata = {
  title: "About Get Me A Chai",
  description: "About Get Me A Chai",
};