import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/libs/prismadb";

const serverAuth = async (req:NextApiRequest,res:NextApiResponse) => {
    const session = await getSession({req});
    if(!session?.user?.email){
        throw Error("Not Signed In");
    }

    const currentUser = await prismadb.user.findUnique({
        where:{
            email:session.user.email
        }
    })

    if(!currentUser){
        throw Error("Not Signed In");
    }

    return {currentUser};
}

export default serverAuth;