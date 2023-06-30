import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest,res:NextResponse) {
  const { searchParams } = new URL(req.url);
 
 
    const data = await prisma.user.findUnique({
      where: {
        email: searchParams.get("id")?.toString(),
      },

      include: { candidatures: { include: { competition: {} } } },
    });

    if(!data){

      return   NextResponse.json({data: data, message : "Aucun utilisateur trouvé"}); 
    }
   else return   NextResponse.json(data);
  
}

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    sexe,
    nina,
    certificate,
    diplome,
    diplomeNumber,
    placeOfGraduation,
    countryOfGraduation,
    study,
    speciality,
    uid,
    competitionId,
    
  } = await req.json();


   
  const competition = await prisma.competition.findFirst({
    where: {
      id: competitionId,
    },
    select:{
      id:true,

    }
  });

  if (!competition) {
    return new Response(
      JSON.stringify({ data: "", message: "Competition non trouvé" })
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      email: uid,
    },
  });
if(!user){
  return new Response(
    JSON.stringify({ data: "", message: `Utilisateur non trouvé` })
  );
 
}
 

  const candidatureCheck = await prisma.candidature.findFirst({
    where: {
      authorId: user?.id,
      competitionId: competitionId,
    },
  });
  if (candidatureCheck) {
    return new Response(
      JSON.stringify({
        data: candidatureCheck.id,
        message: "Vous avez déja postuler",
      })
    );
  }






 
 

  const data = await prisma.candidature.create({
    data: {
      title: "title",
      statut: "0",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      birthDate: user?.birthDate ?? "",
      sexe: user?.sexe ?? "",
      nina: user?.nina ?? "",
      certificat: user?.certificate ?? "",
      diplome: diplome,
      diplomeNumber: diplomeNumber,
      placeOfGraduation: placeOfGraduation,
      countryOfGraduation: countryOfGraduation,
      study: study,
      speciality: speciality,
      authorId: user?.id,
      competitionId: competitionId,
    },
  }); 
  return new Response(
    JSON.stringify({ data: data.id, message: "La candidature est créer" })
  );
  
}
