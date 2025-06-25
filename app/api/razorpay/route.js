import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
  await connectDb();

  let body = await req.formData();
  body = Object.fromEntries(body);

  // 1. Find the payment order
  const payment = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!payment) {
    return new Response(JSON.stringify({ success: false, message: "Order ID not found" }), {
      status: 404,
    });
  }

  // 2. Fetch the user who created the order
  const user = await User.findOne({ username: payment.to_user });
  if (!user) {
    return new Response(JSON.stringify({ success: false, message: "User not found" }), {
      status: 404,
    });
  }

  // 3. Verify signature
  const isValid = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    user.razorpay_secret
  );

  if (isValid) {
    await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: "true" },
      { new: true }
    );

    // ✅ Use `Response.redirect` for proper browser redirection
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${payment.to_user}?paymentdone=true`,
      302
    );
  } else {
    return new Response(JSON.stringify({
      success: false,
      message: "Payment Verification Failed",
    }), { status: 400 });
  }
};
