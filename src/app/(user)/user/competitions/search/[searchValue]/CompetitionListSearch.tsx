import React from "react";
import { prisma } from "../../../../../../utils/prisma";
import CompetitionCardComponent from "@/components/CompetitionCardComponent";
import Link from "next/link";
import { Competition } from '@prisma/client'

export default async function CompetitionListSearch({
  params,
}: {
  params: {
    searchValue: string;
  };
}) {
  const value: string = `%${params.searchValue}%` 
  const datas:any []= await prisma.$queryRaw`SELECT * FROM Competition WHERE title LIKE ${value} AND statut IN (1,2) `;
  
   
  return (
    <div className="grid items-center w-full sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 md:flex-row">

 
    {datas.map((data) => (
        <Link key={data.id} href={`/user/competitions/${data.id}`}>
      {/*  @ts-ignore  */}
          <CompetitionCardComponent
            key={data.id}
            data={data}
            imageUrl={`https://picsum.photos/300/200?random=${data.id}`}
          />
        </Link>
      ))} 
    </div>
  );
}
