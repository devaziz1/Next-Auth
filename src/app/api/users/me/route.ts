import { Connection } from "@/BDConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { DataExtractionMiddleware } from "@/helper/getDataFromToken";

Connection();

export async function GET(request: NextRequest) {
  try {
    console.log("Inside me request");

    // Extract data from token
    const userId = await DataExtractionMiddleware(request);

    console.log(userId);

    const user = await User.findById({ _id: userId }).select("-password");

    console.log(user);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch user",
      },
      { status: 500 }
    );
  }
}
