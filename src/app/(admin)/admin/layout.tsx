import { Inter } from "next/font/google";
//import React,{useState} from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css";
import MenuComponent from "../../../components/MenuComponent";
import SideBarAdmin from "../../../components/SideBarAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { redirect } from "next/navigation";
/* const inter = Inter({ subsets: ['latin'] })
 */
export const metadata = {
  title: "DNAJ | Concours",
  description: "Direction nationale de l'administration de la justice",
};
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if(session?.user.role != "ADMIN"){
    redirect("/")
  }  
  //const [showMenu, setshowMenu] = useState(false);
  return (
    <html lang="en">
      <body className="flex flex-1 w-full h-screen">
       
          <div className="hidden md:block">
            <SideBarAdmin />
          </div>
          <div className="flex flex-col flex-1">
            <div className="w-full h-[70px] p-4 bg-gray-50 flex shadow-md  items-center justify-end">
              <MenuComponent />
              <div className="flex items-center">

              <p className="mr-4 text-sm">
           
           {session?.user?.email}{" "}
         </p>

               
                <picture className="self-center w-12 h-12 bg-white rounded-full shadow-md md:self-start">
                  {/*  <img src={"https://picsum.photos/300/200?random=10"} alt="image" className="object-cover w-full h-full rounded-lg rounded-t-lg white" /> */}
                </picture>
              </div>
            </div>
            <div className="flex-1 w-full h-full p-4 overflow-y-scroll md:p-10 ">
              {children}
            </div>
          </div>
        
      </body>
    </html>
  );
}
