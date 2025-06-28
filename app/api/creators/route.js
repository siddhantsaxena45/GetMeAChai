import { NextResponse } from 'next/server';
import connectDB from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';

export async function GET() {
  await connectDB();

  const users = await User.find({}).select('username profilepic');

  const creators = await Promise.all(users.map(async (user) => {
    const payments = await Payment.find({ to_user: user.username ,success:"true"});
    const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    return {
      username: user.username,
      profilepic: user.profilepic,
      totalDonations: total,
      supporters: payments.length,
    };
  }));

  return NextResponse.json({ creators });
}
