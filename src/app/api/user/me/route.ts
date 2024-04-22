import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConnection } from "@/dbconfig/dbConnection";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/helpers/compareToken";

dbConnection();

export async function GET(request: NextRequest) {
  try {
    const userId = await generateToken(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
