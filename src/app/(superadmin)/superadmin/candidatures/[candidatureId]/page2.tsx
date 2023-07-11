import ButtonComponent from "../../../../../components/ButtonComponent";
import InputComponent from "../../../../../components/InputComponent";
import { XCircleIcon } from "@heroicons/react/24/solid";
import CompetitionItem from "./CompetitionItem";
import { Suspense } from "react";
import { prisma } from "../../../../../utils/prisma";
async function ShowCompetition({
  params,
}: {
  params: {
    competitionId: string;
  };
}) {
  // const [visible, setVisible] = useState(false);
  
  
  const res = await fetch(`${process.env.BASE_URL}/api/admin/competition`,{next:{revalidate:1}})
  const datas: any[] = await res.json();
     
   
  return (
    <div className="flex flex-col">
      <div className="flex items-center pb-2 mb-8 border-b-2 ">
        <div className="flex-1">Liste des candidature par concours {params.competitionId}</div>{" "}
        <div className="flex px-4 bg-gray-100 rounded-md md:w-[310px]">
          <input
            className="w-full p-1 px-3   h-[45px] bg-gray-100  outline-none"
            placeholder="Rechercher"
          />
        </div>
      </div>
      
      {JSON.stringify(datas)}
    
{/*       <CompetitionItem params={params} data={data} /> */}
    </div>
  );
}

export default ShowCompetition;
