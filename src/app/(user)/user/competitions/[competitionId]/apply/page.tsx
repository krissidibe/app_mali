


import { getServerSession } from "next-auth";
 
import {prisma} from '@/utils/prisma'
 
import { authOptions } from "@/app/api/authOption";
import ApplyItem from "./pageItem";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export const dynamic = "force-dynamic";
async function Home({
  params,
}: {
  params: { competitionId: string; fileAttach: object };
}) {
 const session = await getServerSession(authOptions)
  
 const res1 = await fetch(`${process.env.BASE_URL}/api/user/candidature?email=${session?.user?.email}`,{cache:"no-store"})  
  
 const user: any = await res1.json();  

  const res2 = await fetch(
    `${process.env.BASE_URL}/api/user/competition?id=${params.competitionId}`,
    { cache: "no-store" }
  );
  const file: any = await res2.json();

  const fileAttach = {
    def: file.data?.def,
    bac: file.data?.bac,
    licence: file.data?.licence,
    master1: file.data?.master1,
    master2: file.data?.master2,
  };



  return (
    <div className="flex flex-col">
         
    
       
    <ApplyItem data={{data:user,competitionId:params.competitionId,fileAttach:fileAttach}} />  
      
    </div>
  );
}

export default Home;
 

