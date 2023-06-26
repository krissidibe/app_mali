"use client"
import Image from "next/image";
import { Inter } from "next/font/google";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
 
import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
 
/* const inter = Inter({ subsets: ["latin"] }); */

const Home =() => {
  
 
  const myLoader = () => {

    console.log("notes");
    

    return `https://www.afro-impact.com/wp-content/uploads/2022/01/meilleure-universite-africaine-.jpg`;
  };
  return (
    <div className="flex ">
      
      <div>Base</div>
    </div>
  );
}
export default Home
Home.layout = "Admin";

/* export const getServerSideProps: GetServerSideProps  = async () => {
  // fetching data here
  const notes =  await  prima.user.findFirst();
  // Return the data as props
  return {
    props: {
    notes
    },
  };
}; */