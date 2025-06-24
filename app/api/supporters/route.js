// app/api/userdata/route.js
import { NextResponse } from "next/server";
import { fetchuser, fetchpayments } from "@/app/actions/useraction";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  try {
    const user = await fetchuser(username);
    const payments = await fetchpayments(username);

    return NextResponse.json({
      user,
      payments,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
