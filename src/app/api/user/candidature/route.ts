import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import storeImage from "@/utils/addImageHelper";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get("email") && searchParams.get("id") == null) {
    const data = await prisma.user.findUnique({
      where: {
        email: searchParams.get("email")?.toString(),
      },

      include: { candidatures: { include: { competition: {} } } },
    });
    if (!data) {
      return NextResponse.json({
        data: data,
        message: "Aucun utilisateur trouvé",
      });
    }
    return NextResponse.json(data);
  }

  if (searchParams.get("email") && searchParams.get("id") != "") {


    


    let idInt = searchParams.get("id");
    const data = await prisma.candidature.findFirst({
      where: {

        email: searchParams.get("email")?.toString(),
        id: parseInt(idInt!),
      
      },
      
      include: { competition: {} },
    });
    if (!data) {
      return NextResponse.json({
        data: null,
        message: "Aucun candidature trouvé",
      });
    }

    return NextResponse.json(data);
  }

  return NextResponse.json("Error");
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
      id: formData.get("competitionId")?.toString(),
    },
    select: {
      id: true,
    },
  });

  if (!competition) {
    return new Response(
      JSON.stringify({ data: "", message: "Competition non trouvé" })
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      email: formData.get("uid")?.toString(),
    },
  });
  if (!user) {
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

  let certificateName = "";
  let birthDateFileName = "";
  let cassierFileName = "";
  let certificatVieName = "";
  let certificatVisiteName = "";
  let diplomeFileName = "";

  const certificate = formData.get("certificate") as Blob | null;
  const birthDateFile = formData.get("birthDateFile") as Blob | null;
  const cassierFile = formData.get("cassierFile") as Blob | null;
  const certificatVie = formData.get("certificatVie") as Blob | null;
  const certificatVisite = formData.get("certificatVisite") as Blob | null;
  const diplomeFile = formData.get("diplomeFile") as Blob | null;

  if (
    certificate?.toString() == "" ||
    birthDateFile?.toString() == "" ||
    cassierFile?.toString() == "" ||
    certificatVie?.toString() == "" ||
    certificatVisite?.toString() == "" ||
    diplomeFile?.toString() == ""
  ) {
    return new Response(
      JSON.stringify({
        data: "error",
        message: `Vos fichiers ne sont pas ajoutés car la partie pièces jointe n'est pas complète`,
      })
    );
  }

  try {
    certificateName = await storeImage(certificate);
    birthDateFileName = await storeImage(birthDateFile);
    cassierFileName = await storeImage(cassierFile);
    certificatVieName = await storeImage(certificatVie);
    certificatVisiteName = await storeImage(certificatVisite);
    diplomeFileName = await storeImage(diplomeFile);
  } catch (error) {
    return new Response(
      JSON.stringify({
        data: "error",
        message: `Vos fichiers ne sont pas ajoutés car la partie pièces jointe n'est pas complète`,
      })
    );
  }

  const defFile = formData.get("defFile") as Blob | null;
  const bacFile = formData.get("bacFile") as Blob | null;
  const licenceFile = formData.get("licenceFile") as Blob | null;
  const maitriseFile = formData.get("maitriseFile") as Blob | null;
  const master1File = formData.get("master1File") as Blob | null;
  const master2File = formData.get("master2File") as Blob | null;

  let defFileName = "";
  let bacFileName = "";
  let licenceFileName = "";
  let maitriseFileName = "";
  let master1FileName = "";
  let master2FileName = "";

  try {
    defFileName = await storeImage(defFile);
  } catch (error) {
    defFileName = "non renseigné";
  }

  try {
    bacFileName = await storeImage(bacFile);
  } catch (error) {
    bacFileName = "non renseigné";
  }

  try {
    licenceFileName = await storeImage(licenceFile);
  } catch (error) {
    licenceFileName = "non renseigné";
  }

  try {
    maitriseFileName = await storeImage(maitriseFile);
  } catch (error) {
    maitriseFileName = "non renseigné";
  }

  try {
    master1FileName = await storeImage(master1File);
  } catch (error) {
    master1FileName = "non renseigné";
  }

  try {
    master2FileName = await storeImage(master2File);
  } catch (error) {
    master2FileName = "non renseigné";
  }

  if (
    certificateName == "File not" ||
    birthDateFileName == "File not" ||
    cassierFileName == "File not" ||
    certificatVieName == "File not" ||
    certificatVisiteName == "File not" ||
    diplomeFileName == "File not"
  ) {
    return new Response(
      JSON.stringify({
        data: "error",
        message: `Vos fichiers ne sont pas ajoutés car la partie pièces jointe n'est pas complète`,
      })
    );
  }

  const data = await prisma.candidature.create({
    data: {
      title: "title",
      statut: "0",
      content: "",
      certificat: "",
      
      email: user?.email ?? "",
      image: user?.image ?? "",
      number: user?.number ?? "",
      address: user?.address ?? "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      birthDate: user?.birthDate ?? "",
      placeBirthDate: user?.placeBirthDate ?? "",
      sexe: user?.sexe ?? "",
      nina: user?.nina ?? "",
      ninaFile: user?.ninaFile ?? "",
      diplome: formData.get("diplome")?.toString() ?? "",
      diplomeNumber: formData.get("diplomeNumber")?.toString() ?? "",
      placeOfGraduation: formData.get("placeOfGraduation")?.toString() ?? "",
      countryOfGraduation:
        formData.get("countryOfGraduation")?.toString() ?? "",
      study: formData.get("study")?.toString() ?? "",
      speciality: formData.get("speciality")?.toString() ?? "",
      authorId: user?.id,
      competitionId: formData.get("competitionId")?.toString() ?? "",
      //file
      certificate: certificateName,
      birthDateFile: birthDateFileName,
      cassierFile: cassierFileName,
      certificatVie: certificatVieName,
      certificatVisite: certificatVisiteName,
      diplomeFile: diplomeFileName,

      def: defFileName,
      bac: bacFileName,
      licence: licenceFileName,
      maitrise: maitriseFileName,
      master1: master1FileName,
      master2: master2FileName,
    },
  });

   const dataFormat =new Date(Date.now()).getFullYear().toString().substring(2, 4);

  
  const strNumber = data.id; 
 
const finalData =  await prisma.candidature.update({
    where: {
      id: data.id,
    },
    data: {
      numeroRef:`DNAJ${dataFormat}${strNumber.toString().padStart(6, '0')}`
    },
  });
  return new Response(
    JSON.stringify({ data: data.id, message: "La candidature est créer" })
  );
}
