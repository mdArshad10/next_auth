import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConnection } from "@/dbconfig/dbConnection";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 404 }
      );
    }

    // generate token
    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.SECRETKEY!, {
      expiresIn: "1hr",
    });

    const response = NextResponse.json({
      message: "login successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
