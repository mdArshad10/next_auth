import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const generateToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decode: any = jwt.verify(token, process.env.SECRETKEY!);
    return decode._id;
  } catch (error: any) {
    throw Error(error.message);
  }
};
