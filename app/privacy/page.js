// Privacy.js
import React from 'react'

const Privacy = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-300 mb-3">
        Your privacy is important to us. Here's how we handle your data:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        <li>We collect minimal data needed to process payments and run the platform.</li>
        <li>We do not sell or share your personal information with third parties.</li>
        <li>Payment information is handled securely by Razorpay.</li>
        <li>You can contact us anytime to review or delete your data.</li>
      </ul>
    </div>
  )
}

export default Privacy
