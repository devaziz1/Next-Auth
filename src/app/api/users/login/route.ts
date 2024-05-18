import { Connection } from "@/BDConfig/dbConfig";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

Connection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("Request body");
    console.log(reqBody);
    const { email, password } = reqBody;

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    console.log("User found");
    console.log(user);

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }

    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const respose = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    respose.cookies.set("token", token, {
      httpOnly: true,
    });

    return respose;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
