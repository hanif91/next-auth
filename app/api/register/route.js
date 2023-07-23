import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const POST = async (request) => {
  const body = await request.json();
  const {name , username,password} = body.data;


  console.log(body.data);

  const exist = await prisma.users.findUnique({
      where : {
        username:username
      }
    });

  if(exist) {
    console.log('already exist')
    return new NextResponse("Username Already Exist", {status:400});

  }
  const hashedPass = await bcrypt.hash(password,10);
  console.log (hashedPass);

  try {
    const user = await prisma.users.create(
      {
        data:{
          name : name,
          username : username,
          password: hashedPass,
          status: 1,
        },
    });
    return new NextResponse("Add User Success",{status:200});
  
  } catch (error) {
    console.log("tes")
  }

  


}