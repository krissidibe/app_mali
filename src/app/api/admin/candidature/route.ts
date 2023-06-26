import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
//const { searchParams } = new URL(req.url);

return new Response(JSON.stringify( 'datasPrisma'));

  
}
export async function PATCH(req: NextRequest, res: NextResponse) {
  const {
    id,
    statut
  } = await req.json();
  const data = await prisma.candidature.update({
     where : {
      id : id
     },
     data:{
      statut : statut
     }
  });
  return new Response(
    JSON.stringify({ user: data, message: "La candidature est modifier" })
  );


  
  return new Response(
    JSON.stringify({ user: data, message: "Le concours est créer" })
  );
} 