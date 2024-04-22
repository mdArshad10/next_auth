import { dbConnection } from "@/dbconfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "logout successfully",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
