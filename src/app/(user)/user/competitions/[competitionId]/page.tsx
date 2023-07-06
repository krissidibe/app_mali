import ButtonComponent from "../../../../../components/ButtonComponent";
import InputComponent from "../../../../../components/InputComponent";
import { XCircleIcon } from "@heroicons/react/24/solid";
import CompetitionItem from "./CompetitionItem";
import { Suspense } from "react";
import { prisma } from "../../../../../utils/prisma";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
export const dynamic = "force-dynamic";
async function ShowCompetition({
  params,
}: {
  params: {
    competitionId: string;
  };
}) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/user/competition?id=${params.competitionId}`,
    { cache: "no-store" }
  );
  const data: any = await res.json();


  const session = await getServerSession(authOptions)
  const resUser = await fetch(`${process.env.BASE_URL}/api/user/candidature?email=${session?.user?.email}`,{cache:"no-store"})  
  const dataUser: any = await resUser.json();  

const arrayCandidature: any[] = dataUser.candidatures;
const access = arrayCandidature.filter(word => word.competitionId == data.data.id).length == 0 ? true : false

  const fileAttach = {
    def: data.data?.def,
    bac: data.data?.bac,
    licence: data.data?.licence,
    master1: data.data?.master1,
    master2: data.data?.master2,
  };
  const statutData = [
    { name: "Brouillon", code: "0", color: "text-black" },
    { name: "Ouvert", code: "1", color: "text-green-500" },
    { name: "Fermé", code: "2", color: "text-orange-500" },
    { name: "Suspendu", code: "3", color: "text-red-500" },
  ];

  if (!data.data) {
    return notFound();
  }
  // const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col">
 
     
      <div className="w-full mb-6 rounded-lg h-1/2 bg-slate-600 ">
        <picture>
          <img
            src={`${process.env.BASE_URL}${data.data.image}`}
            alt="image"
            className="object-cover w-full max-h-[360px] md:max-h-[410px]  rounded-lg"
          />
        </picture>
      </div>
      <h1 className="w-full pb-2 mb-4 border-b-2">{data.data?.title}</h1>
      <div className="flex flex-col items-center p-4 mb-4 rounded-lg md:items-end bg-slate-100">
        <span
          className={`text-[14px]  text-gray-500  ${
            statutData[parseInt(data.data.statut)].color
          }  `}
        >
          Etat du concours : {statutData[parseInt(data.data.statut)].name}
        </span>
        <span className="text-[14px]  text-gray-500   ">
          Date : du{" "}
          {new Date(data.data.startDateAt).toLocaleDateString("fr-FR")} au{" "}
          {new Date(data.data.endDateAt).toLocaleDateString("fr-FR")}
        </span>
        <span className="text-[14px]  text-gray-500  ">
          L'age est comprise entre : {data.data.ageMin} ans et{" "}
          {data.data.ageMax} ans
        </span>
      </div>
      <p className="text-[15px]">
        {parse(data.data?.content || "")}
      </p>
     {access ?  <div className="flex items-end justify-end w-full my-4 ">
        {new Date(data.data.endDateAt) > new Date(Date.now()) && data.data.statut == "1" ? (
          <ButtonComponent
            key={4}
            label="Postuler"
            className="md:w-[150px] self-end "
            href={`/user/competitions/${data.data?.id}/apply?title=${data.data.title}`}
            full={true}
          />
        ) : (
          <div className="flex w-full items-center justify-center p-4 my-4 border-[1px] border-orange-300 bg-slate-50">
          <p>La date du concours est depassé ou le concours n'est plus disponible </p>
          </div>
        )}
      </div> : <div className="flex items-center justify-center p-4 my-4 border-[1px] border-orange-300 bg-slate-50">
        Vous avez déja postuler
        </div>}
    </div>
  );
}

export default ShowCompetition;
