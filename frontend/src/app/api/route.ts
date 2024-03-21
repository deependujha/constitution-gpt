import { stat } from "fs";
import axios from "axios";
import { NextResponse } from 'next/server'

export async function POST( request: Request ) {
    try {
        const res = await request.json()
        const user_prompt = res[ 'prompt' ]
        console.log( `user prompt: ${user_prompt}` )

        const result = await axios.post( "http://backend/get_answer", {
            "prompt": user_prompt
        } )

        return NextResponse.json( result.data, { status: 200 } )
    }
    catch ( err ) {
        let msg = ""
        if ( err instanceof Error ) {
            msg = err.message
        }
        else {
            msg = String( err )
        }
        return NextResponse.json( {
            "status": "Error answering prompt",
            "error": msg
        }, { status: 400 } )
    }


}