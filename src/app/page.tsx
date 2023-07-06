"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useModalInfoStore } from "../store/useModalInfoStore";
import ModalInfo from "@/components/ModalInfo";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
function page() {
  const [email, setEmail] = useState("");

  const router = useRouter();
  const [password, setPassword] = useState("");
  const modal = useModalInfoStore();
  const [modalData, setModalData] = useState("");
  const session = useSession();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
    //  router.push("/user");
    }
  });

  const login2User = async (e: FormEvent) => {
    e.preventDefault();

    signIn("credentials", { ...data, redirect: false }).then((callback) => {

    

      if (callback?.error) {
        toast.error(callback.error);
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Logged in successfully!");
          router.push("/user");
      }
    });
  };

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/author/user", {
      body: JSON.stringify({
        email,
        password,
        firstName: "firstName",
        lastName: "lastName",
        number: "number",
        sexe: "sexe",
        type: "type",
      }),
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const data = await res.json();

    if (!data.user) {
      modal.onOpen();
      setModalData(data.message);
    } else {
      e.preventDefault();

      signIn("credentials", { ...data, redirect: false }).then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully!");
        }
      });

      console.log(data.user);
      // sessionStorage.setItem("user", JSON.stringify(data.user));
      // router.push("/user");

      return;
    }
  };
  return (
    <div className="flex flex-1 w-screen h-screen overflow-y-scroll bg-white">
      <ModalInfo title="Alert" body={modalData} />
      <div className="flex flex-col items-center justify-between w-full h-full p-10 md:w-1/2 overscroll-y-auto ">
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

        <Card className="md:w-[400px] w-full mt-10">
          <CardHeader>
            <CardTitle>Connectez-vous à votre compte</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
              animi minima autem{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={login2User}>
              <div className="grid items-center w-full gap-4">
                <InputComponent
                  key={1}
                  label="Email"
                  inputType="email"
                  Icon={EnvelopeIcon}
                  withIcon={true}
                  value={data.email}
                  handleChange={(e) =>
                    setData({ ...data, email: e.target.value })
                  }
                />
                <InputComponent
                  key={2}
                  label="Mot de passe"
                  obscureInput={true}
                  Icon={LockClosedIcon}
                  withIcon={true}
                  value={data.password}
                  inputType="password"
                  handleChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <div className="flex flex-col space-y-1.5">
                 
                  <ButtonComponent
                    key={2}
                    type="submit"
                    label="SE CONNECTER"
                    full={true}
                  />
                   <ButtonComponent
                    key={1}
                    label="S'INSCRIRE"
                    href={"/signin"}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Label>Mot de passe oublier ?</Label>
          </CardFooter>
        </Card>

        <p className="text-[12px] pb-8 text-gray-500 max-w-[400px] text-center mt-10 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
          tincidunt neque. Pellentesque vitae commodo justo. Integer tempor
          dignissim tortor, eu elementum arcu dictum non. at tincidunt neque.
          Pellentesque vitae commodo justo. Integer tempor dignissim{" "}
        </p>
      </div>
      <div className="flex flex-col items-center justify-between hidden w-1/2 h-full md:block bg-red-50">
        <Image
          className="object-cover w-full h-full"
          src="/images/meilleure-universite-africaine.jpg"
          //   loader={myLoader}

          alt="Picture of the author"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}

export default page;
