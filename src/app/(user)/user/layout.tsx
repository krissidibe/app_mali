import { Inter } from "next/font/google";
//import React,{useState} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css";
import MenuComponent from "../../../components/MenuComponent";
import SideBarUser from "../../../components/SideBarUser";
import ModalInfo from "../../../components/ModalInfo";
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

/* const inter = Inter({ subsets: ["latin"] });
 */
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
   if(session?.user.role != "USER"){
    redirect("/")
  }  
  //const [showMenu, setshowMenu] = useState(false);
  return (
    <html lang="en">
      <body className="flex flex-1 w-full h-screen">
        <ModalInfo title="Alert" body="kris" />

        <div className="hidden md:block">
          <SideBarUser />
        </div>
        <div className="flex flex-col flex-1">
          <div className="w-full h-[70px] p-4 bg-[#50A1EF] text-white flex shadow-md  items-center justify-end">
            <MenuComponent />
            <div className="flex items-center justify-center">
              <p className="mr-4 text-sm">
           
                {session?.user?.email}{" "}
              </p>

              <Avatar>
                <AvatarImage
                  src={`${process.env.BASE_URL}${session?.user?.image}`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="h-full p-4 overflow-y-scroll md:p-10 ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
