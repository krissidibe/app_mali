"use client";
import Image from "next/image";
import InputComponent from "../../components/InputComponent";
import InputSelectComponent from "../../components/InputSelectComponent";
import ButtonComponent from "../../components/ButtonComponent";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useModalInfoStore } from "@/store/useModalInfoStore";
import ModalInfo from "@/components/ModalInfo";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
export default function Signin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const sexeOptions = [
    {
      label: "Homme",
      value: 0,
    },
    {
      label: "Femme",
      value: 1,
    },
  ];
  const [sexe, setSexe] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVeirfy, setPasswordVerify] = useState("");

  const modal = useModalInfoStore();
  const [modalData, setModalData] = useState("");
  const router = useRouter();
  const createUser = async () => {
    const res = await fetch(`/api/user/author`, {
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        number,
        sexe,
        password,
        type: "create",
      }),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    const data = await res.json();
    console.log(data);
    if (data.message) {
      modal.onOpen();
      setModalData(data.message);
    }
  };

  return (
    <div className="flex flex-1 w-screen h-screen bg-black ">
      <ModalInfo title="Alert" body={modalData} />
      <div className="flex flex-col items-center w-full h-full p-10 overflow-y-scroll md:w-1/2 bg-gray-50">
        <div className="md:min-w-[450px] mt-10 mb-10 justify-center w-[353px] items-center flex flex-col space-y-2">
          <Image
            src="/images/logo.png"
            alt="me"
            className=" left-20"
            width="64"
            height="64"
          />
          <p>DNAJ</p>
        </div>
   
        <Card className="max-w-[400px] my-10 md:max-w-[500px]">
        <CardTitle className="px-4 mt-4 text-sm cursor-pointer" onClick={()=>{
              router.back()
            }}>Retour</CardTitle>
          <CardHeader>
            <div className="flex items-center mb-4 space-x-4">
              
         
         
              <CardTitle>Inscription</CardTitle>
            </div>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
              tincidunt neque. Pellentesque vitae commodo justo. Integer tempor
              Pellentesque vitae Integer tempor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid items-center w-full gap-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={lastName}
                    handleChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    Icon={UserIcon}
                    withIcon={true}
                    key={1}
                    label="Nom"
                  />
                  <InputComponent
                    value={firstName}
                    handleChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    Icon={UserIcon}
                    withIcon={true}
                    key={2}
                    label="Prénom"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={email}
                    handleChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    Icon={EnvelopeIcon}
                    withIcon={true}
                    key={3}
                    label="Email"
                    inputType="email"
                  />
                  <InputComponent
                    value={number}
                    handleChange={(e) => {
                      setNumber(e.target.value);
                    }}
                    Icon={PhoneIcon}
                    withIcon={true}
                    key={4}
                    label="Numero de téléphone"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={number}
                    handleChange={(e) => {
                      setNumber(e.target.value);
                    }}
                    Icon={PhoneIcon}
                    withIcon={true}
                    key={4}
                    label="Date de Naissance"
                  />
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Sexe</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sexe" />
                        <SelectContent position="popper">
                          <SelectItem value="Homme">Homme</SelectItem>
                          <SelectItem value="Femme">Femme</SelectItem>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <InputComponent
                    value={password}
                    handleChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    Icon={LockClosedIcon}
                    withIcon={true}
                    key={6}
                    label="Mot de passe"
                    inputType="password"
                  />
                  <InputComponent
                    value={passwordVeirfy}
                    handleChange={(e) => {
                      setPasswordVerify(e.target.value);
                    }}
                    Icon={LockClosedIcon}
                    withIcon={true}
                    key={7}
                    inputType="password"
                    label="Confirmer le mot de passe"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <ButtonComponent
              handleClick={createUser}
              key={8}
              label="Créer le compte"
              full={true}
              className="self-end w-full mt-4 md:w-[200px]"
            />
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col items-center justify-between hidden w-1/2 h-full md:block bg-red-50">
        <Image
          className="object-cover w-full h-full"
          // loader={myLoader}
          src="/images/meilleure-universite-africaine.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
