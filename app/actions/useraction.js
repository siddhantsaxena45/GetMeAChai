"use server";

import Razorpay from "razorpay"; 
import connectDB from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";

export async function initiate(amount, to_user, paymentform) {
  await connectDB();

  const userData = await User.findOne({ username: to_user });

  const instance = new Razorpay({
    key_id: userData.razorpay_id,
    key_secret: userData.razorpay_secret,
  });

  const options = {
    amount: Number(amount) * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      to: to_user,
      name: paymentform.name,
      message: paymentform.message,
    },
  };

  const order = await instance.orders.create(options);

  await Payment.create({
    oid: order.id,
    to_user,
    amount,
    name: paymentform.name,
    message: paymentform.message,
  });

  return order;
}

// Fetch user by username
export const fetchuser = async (username) => {
  await connectDB();
  const u = await User.findOne({ username });
  if (!u) return null;
  const user = u.toObject({ flattenObjectIds: true });
  return user;
};

// Fetch verified supporters (payments) for a user
export const fetchpayments = async (username) => {
  await connectDB();

  const p = await Payment.find({
    to_user: username,
    done: "true", // only successful payments
  })
    .sort({ amount: -1 }) // or by amount: -1 if needed
    .lean();

  return p;
};



export const updateProfile = async (data, oldusername) => {
  await connectDB();

  let ndata = Object.fromEntries(data);

  // Check for username conflict
  if (oldusername !== ndata.username) {
    const existing = await User.findOne({ username: ndata.username });
    if (existing) {
      return { error: "Username already exists" };
    }
  }

  // Update user document
  await User.updateOne({ username: oldusername }, ndata);

  // Update all related payments with new to_user username
  if (oldusername !== ndata.username) {
    await Payment.updateMany(
      { to_user: oldusername },
      { $set: { to_user: ndata.username } }
    );
  }

  return { success: true };
};
