import { Connection } from "@/BDConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

Connection();

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
        message: "Logout successfully",
        success: true,
    })

    response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    return response
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
