import { Connection } from "@/BDConfig/dbConfig";

import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";


Connection();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody
        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiration: {$gt:Date.now()} });
        
        if(!user){
            console.error("Invalid token");
            return NextResponse.json({ error: "Invalid token details" }, { status: 400 });
        }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiration = undefined

        await user.save();
        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
        
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({error: error.message} , {status: 500} );
    }
}