import bcrypt from "bcrypt";
import { dbConnection } from "@/dbconfig/dbConnection";
import { User } from "@/models/user.model";
import { sendMailer } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;

    console.log({ username, password, email });

    // check the user is already present or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { message: "user already present" },
        { status: 400 }
      );
    }

    // hashed the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    console.log(newUser);

    // send the email
    sendMailer({ email, emailType: "VERIFY", userId: newUser._id });

    return NextResponse.json({
      message: "User register successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
