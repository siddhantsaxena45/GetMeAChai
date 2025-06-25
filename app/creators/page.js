'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CreatorsPage = () => {
  const [creators, setCreators] = useState([]);
  const router = useRouter();

  useEffect(() => {
    document.title = 'Support a Creator';
    const fetchCreators = async () => {
      try {
        const res = await fetch('/api/creators');
        const data = await res.json();
        setCreators(data.creators || []);
      } catch (error) {
        console.error('Failed to fetch creators:', error);
      }
    };

    fetchCreators();
  }, []);

  const handleClick = (username) => {
    router.push(`/${username}`);
  };

  return (
    <div className="min-h-[80vh]  p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Support a Creator</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {creators.map((creator) => (
          <div
            key={creator.username}
            className="bg-gray-800 rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => handleClick(creator.username)}
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={creator.profilepic || '/chai.gif'}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover bg-gray-700"
              />
              <div>
                <h2 className="text-xl font-semibold">@{creator.username}</h2>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-300">
              <span>🫶 {creator.supporters} supporters</span>
              <span>💰 ₹{creator.totalDonations}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorsPage;

