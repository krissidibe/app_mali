import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import storeImage from "@/utils/addImageHelper";

export async function GET(req: NextRequest,res:NextResponse) {
  const { searchParams } = new URL(req.url);
 
 
    const data = await prisma.user.findUnique({
      where: {
        email: searchParams.get("email")?.toString(),
      },

      include: { candidatures: { include: { competition: {} } } },
    });

    if(!data){

      return   NextResponse.json({data: data, message : "Aucun utilisateur trouvé"}); 
    }
   else return   NextResponse.json(data);
  
}

export async function POST(req: NextRequest, res: NextResponse) {
/*   const {
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

 */
  const formData = await req.formData();
   
  const competition = await prisma.competition.findFirst({
    where: {
      id: formData.get("competitionId")?.toString()  ,
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
      email: formData.get("uid")?.toString() ,
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
      competitionId: formData.get("competitionId")?.toString(),
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






 
  const defFile = formData.get("defFile") as Blob | null;

 


  let defFileName = "";

  try {
    defFileName = await storeImage(defFile);
  } catch (error) {
    defFileName =   "non renseigné";
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
      diplome: formData.get("diplome")?.toString() ?? "",
      diplomeNumber: formData.get("diplomeNumber")?.toString() ?? "",
      placeOfGraduation: formData.get("placeOfGraduation")?.toString() ?? "",
      countryOfGraduation: formData.get("countryOfGraduation")?.toString() ?? "",
      study: formData.get("study")?.toString() ?? "",
      speciality: formData.get("speciality")?.toString() ?? "",
      authorId: user?.id,
      competitionId: formData.get("competitionId")?.toString() ?? "" ,
      def: defFileName,
    },
  }); 
  return new Response(
    JSON.stringify({ data: data.id, message: "La candidature est créer" })
  );
  
}
