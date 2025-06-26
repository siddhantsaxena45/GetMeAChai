// Terms.js
import React from 'react'

const Terms = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="text-gray-700 mb-3">
        By using Get Me A Chai, you agree to the following terms:
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Donations are voluntary and non-refundable.</li>
        <li>Creators are responsible for the content they produce and the donations they receive.</li>
        <li>We reserve the right to remove any user violating our policies.</li>
        <li>All users must comply with applicable laws and financial regulations.</li>
      </ul>
    </div>
  )
}

export default Terms
