import bcrypt from "bcrypt";
import { dbConnection } from "@/dbconfig/dbConnection";
import { User } from "@/models/user.model";
import { sendMailer } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifiedToken: token,
      verifiedTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "invalid token" }, { status: 404 });
    }

    user.isVerified = true;
    user.verifiedToken = undefined;
    user.verifiedTokenExpire = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email Verification done",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
