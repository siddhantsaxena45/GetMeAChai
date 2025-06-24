import { Razorpay } from "razorpay"
import connectDB from "@/db/connectDb"
import User from "@/models/User"
import Payment from "@/models/Payment"

export const initiatePayment = async (amount, to_username, paymentform) => {
    await connectDB()
    const { amount } = req.body

    var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
       
    };

    let x= await instance.orders.create({options})
    await Payment.create({
      oid:x.id,
      
      to_username:to_username,
      amount:amount,
      name:paymentform.name,
      message:paymentform.message
    })
    return x
    
}