"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import parse from "html-react-parser";

function page() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const dataUser = searchParams.get("user");

  const result = JSON.parse(data!);
  const user = JSON.parse(dataUser!);
  const statutData = [
    { name: "Brouillon", code: "0", color: "text-black" },
    { name: "Ouvert", code: "1", color: "text-green-500" },
    { name: "Fermé", code: "2", color: "text-orange-500" },
    { name: "Suspendu", code: "3", color: "text-red-500" },
  ];

  return (
    <div className="flex flex-col h-full">
      <p className="pb-2 mb-10 font-semibold border-b-2">
        Les information sur la candidature
      </p>
      <div className="flex flex-1 h-full gap-6 ">
        <div className="w-full h-full p-4 overflow-y-scroll text-sm bg-gray-100 shadow-md scrollbar-hide md:w-1/2">
          <picture>
            <img
              src={`https://picsum.photos/300/200?random=22`}
              alt="image"
              className="object-cover w-full max-h-[310px] md:max-h-[410px]  rounded-lg"
            />
          </picture>
          <h1 className="my-4 font-bold ">{result.competition.title}</h1>
          <div className="flex flex-col items-center p-4 mb-4 rounded-lg md:items-end bg-slate-100">
            <span
              className={`text-[14px]  text-gray-500  ${
                statutData[parseInt(result.competition.statut)].color
              }  `}
            >
              Etat du concours :{" "}
              {statutData[parseInt(result.competition.statut)].name}
            </span>
            <span className="text-[14px]  text-gray-500   ">
              Date : du{" "}
              {new Date(result.competition.startDateAt).toLocaleDateString(
                "fr-FR"
              )}{" "}
              au{" "}
              {new Date(result.competition.endDateAt).toLocaleDateString(
                "fr-FR"
              )}
            </span>
            <span className="text-[14px]  text-gray-500  ">
              L'age est comprise entre : {result.competition.ageMin} ans et{" "}
              {result.competition.ageMax} ans
            </span>
          </div>
          <p className="text-[14px] text-gray-500 mb-20">
            {parse(result.competition.content || "")}
          </p>
        </div>
        <div className="w-full h-full p-4 overflow-y-scroll text-sm bg-gray-100 shadow-md md:w-1/2 scrollbar-hide">
          <h1 className="my-4 font-bold ">Information personnelle</h1>

          <div className="w-32 h-32 mb-4 bg-white rounded-full"></div>
          <div className="flex flex-col pb-4 space-y-4 border-b-2">
            <div className="flex justify-between space-x-4">
              <ItemUser label={"Nom"} value={user.firstName} />
              <ItemUser label={"Prénom"} value={user.lastName} />
            </div>
            <div className="flex justify-between space-x-4">
              <ItemUser
                label={"Date de naissance"}
                value={new Date(user.birthDate).toLocaleDateString("fr-Fr")}
              />
              <ItemUser label={"Sexe"} value={user.sexe} />
            </div>

            <div className="flex justify-between space-x-4">
              <ItemUser label={"Numero du téléphone"} value={user.number} />
              <ItemUser label={"Numero nina"} value={user.nina} />
            </div>
          </div>
          <h1 className="my-4 font-bold ">Les pieces jointes</h1>
        </div>
      </div>
    </div>
  );

  function ItemUser({ label, value }: any) {
    return (
      <div className="flex justify-between w-full p-4 bg-white rounded-md">
        <p className="flex-1 font-bold text-md">{label}</p>
        <p className="font-bold text-md">{value}</p>
      </div>
    );
  }
}

export default page;
