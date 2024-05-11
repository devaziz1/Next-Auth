import { Connection } from "@/BDConfig/dbConfig";
import bcryptjs from "bcrypt";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/mailer";

Connection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = request.json();
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = await reqBody;
    console.log(username);
    console.log(email);
    console.log(password);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "User ALready exists",
        },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send Verification mail

    await sendEmail({email, emailType: "VERIFY",userId: savedUser._id});

    return NextResponse.json({
        message: "User Created successfully",
        success: true,
        savedUser
    })


  } catch (error) {
    return NextResponse.json(error);
  }
}
