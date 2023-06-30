


import { getServerSession } from "next-auth";
 
import {prisma} from '@/utils/prisma'
 
import { authOptions } from "@/app/api/authOption";
import ApplyItem from "./pageItem";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Home({
  params,
}: {
  params: { competitionId: string; fileAttach: object };
}) {
 const session = await getServerSession(authOptions)
  
  const data = await prisma.user.findUnique({
    where: {
      email:session?.user?.email ?? "",
    },
  });
  return (
    <div className="flex flex-col">
      {/*    <p>{JSON.stringify(data)}</p>   */}
    
       
    <ApplyItem data={{data:data,competitionId:params.competitionId}}  />
      
    </div>
  );
}

export default Home;
 

