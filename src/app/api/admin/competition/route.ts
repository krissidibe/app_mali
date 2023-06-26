import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
const { searchParams } = new URL(req.url);

 
 

  if (searchParams.get("id") == null) {
   
  const datasPrisma = await prisma.competition.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        title: "desc",
      },
    ],

    include: { candidatures: {include:{competition:{}}} },
  });

  //  console.log(searchParams.get("name"));
  return new Response(JSON.stringify(datasPrisma));
  }

  const datasPrisma = await prisma.candidature.findMany({
    where: {
      competitionId:searchParams.get("id")?.toString()
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        title: "desc",
      },
    ],
    include:{author:{include:{candidatures:{}}}}
  });

  //  console.log(searchParams.get("name"));
  return new Response(JSON.stringify( datasPrisma));

  
}

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    title,
    statut,
    startDateAt,
    endDateAt,
    valueContent,
    image,
    ageMax,
    ageMin,
  } = await req.json();

  const data = await prisma.competition.create({
    data: {
      image: image,
      title: title,
      content: valueContent,
      statut: statut.code,
      startDateAt: new Date(startDateAt),
      endDateAt: new Date(endDateAt),
      ageMin: parseInt(ageMin),
      ageMax: parseInt(ageMax),
    },
  });
  return new Response(
    JSON.stringify({ user: data, message: "Le concours est créer" })
  );
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const {
    title,
    statut,
    startDateAt,
    endDateAt,
    valueContent,
    image,
    ageMax,
    ageMin,
    id,
  } = await req.json();

  const data = await prisma.competition.update({
    where: {
      id: id,
    },
    data: {
      image: image,
      title: title,
      content: valueContent,
      statut: statut.code,
      startDateAt: new Date(startDateAt),
      endDateAt: new Date(endDateAt),
      ageMin: parseInt(ageMin),
      ageMax: parseInt(ageMax),
    },
  });
  return new Response(
    JSON.stringify({ user: data, message: "Le concours est modifier" })
  );
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const data = await prisma.competition.delete({
    where: {
      id: req.nextUrl.searchParams.get("id")?.toString(),
    },
  });
  return new Response(
    JSON.stringify({ user: data, message: "Le concours est supprimer" })
  );
}
