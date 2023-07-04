"use client";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import ModalInfo from "@/components/ModalInfo";
import { useModalInfoStore } from "@/store/useModalInfoStore";
import { getServerSession } from "next-auth";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { FaDownload } from "react-icons/fa";
import { RiAlertLine, RiDeleteBin6Line } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSession } from "next-auth/react";
import dayjs from "dayjs";
export default function ApplyItem(data, competitionId,fileAttach) {
  const { data: session, status } = useSession();
  const [lastName, setLastName] = useState(data.data.data.lastName);
  const [firstName, setFirstName] = useState(data.data.data.firstName);

  const [image, setImage] = useState(data.data.data.image);
  const [birthDate, setBirthDate] = useState(null);

  const [email, setEmail] = useState(data.data.data.email);
  const [number, setNumber] = useState(data.data.data.number);
  const [address, setAddress] = useState(data.data.data.address);

  const [numberNina, setNumberNina] = useState(data.data.data.numberNina);

  const [date, setDate] = useState(
    dayjs(data.data.birthDate).format("DD/MM/YYYY")
  );

  const router = useSearchParams();

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
  const [sexe, setSexe] = useState(sexeOptions[0].label);
  const [nina, setNina] = useState(data.data.data.nina ?? "");
  const [ninaFile, setNinaFile] = useState(data.data.data.ninaFile ?? "");

  const [certificate, setCertificate] = useState("");
  const [birthDateFile, setBirthDateFile] = useState("");
  const [cassierFile, setCassierFile] = useState("");
  const [certificatVie, setCertificatVie] = useState("");
  const [certificatVisite, setCertificatVisite] = useState("");
  const [diplomeFile, setDiplomeFile] = useState("");

  const [diplome, setDiplome] = useState("");
  const [diplomeNumber, setDiplomeNumber] = useState("");
  const [placeOfGraduation, setPlaceOfGraduation] = useState("");
  const [countryOfGraduation, setCountryOfGraduation] = useState("");
  const [study, setStudy] = useState("");
  const [speciality, setSpeciality] = useState("");

  const modal = useModalInfoStore();
  const [modalData, setModalData] = useState("");
  const dataAttach = JSON.parse(`${router.get("fileAttach")}`);
  const defRef = useRef(null);
  const [defFile, setDefFile] = useState("");
  const [bacFile, setBacFile] = useState("");
  const [licenceFile, setLicenceFile] = useState("");
  const [master1File, setMaster1File] = useState("");
  const [master2File, setMaster2File] = useState("");
  const getUser = async () => {};
  useEffect(() => {
    if (status == "loading") {
    }

    (function () {
      getUser();
    });

    return () => {};
  }, []);

  const createApply = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("sexe", sexe);
    formData.append("nina", nina);
    formData.append("certificate", certificate);
    formData.append("diplome", diplome);
    formData.append("diplomeNumber", diplomeNumber);
    formData.append("placeOfGraduation", placeOfGraduation);
    formData.append("countryOfGraduation", countryOfGraduation);
    formData.append("study", study);
    formData.append("speciality", speciality);

    formData.append("uid", session?.user?.email);
    formData.append("competitionId", data.data.competitionId);


    formData.append("certificate", certificate);
    formData.append("birthDateFile", birthDateFile);
    formData.append("cassierFile", cassierFile);
    formData.append("certificatVie", certificatVie);
    formData.append("certificatVisite", certificatVisite);
    formData.append("diplomeFile", diplomeFile);

    //Diplome 
    formData.append("defFile", defFile);
    formData.append("bacFile", bacFile);
    formData.append("licenceFile", licenceFile);
    formData.append("master1File", master1File);
    formData.append("master2File", master2File);
    
    /* 
    body: JSON.stringify({
        sexe,
        nina,
        certificate,
        diplome,
        diplomeNumber,
        placeOfGraduation,
        countryOfGraduation,
        study,
        speciality,
        uid: session?.user?.email,
        competitionId: data.data.competitionId,
      }), */
    const res = await fetch(`/api/user/candidature`, {
      body: formData,
      method: "POST",
    });
    const dataNew = await res.json();
    console.log(dataNew);

    setModalData((x) => (x = dataNew.message));
    if (dataNew) {
      modal.onOpen();
    }
  };
  const defCheck = data.data.fileAttach.def;
  const bacCheck = data.data.fileAttach.bac;
  const licenceCheck = data.data.fileAttach.licence;
  const master1Check = data.data.fileAttach.master1;
  const master2Check = data.data.fileAttach.master2;
 

  return (
    <div className="flex flex-col md:flex-row md:space-x-10">
      
      <Card className="flex-1 my-10 md:max-w-[500px]">
        <CardHeader>
          <CardTitle className="mb-2">Mes informations</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
            tincidunt neque. Pellentesque vitae commodo justo. Integer tempor
            Pellentesque vitae Integer tempor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Avatar className="w-[100px] h-[100px]   mb-4">
              <AvatarImage src={`${process.env.BASE_URL}${image}`} />
              <AvatarFallback>
                {firstName[0]}
                {lastName[0]}
              </AvatarFallback>
            </Avatar>{" "}
            <div className="grid items-center w-full gap-4">
              <div className="grid gap-6 md:grid-cols-2">
                <InputComponent
                  value={lastName}
                  readonly={true}
                  key={1}
                  label="Nom"
                />
                <InputComponent
                  value={firstName}
                  readonly={true}
                  key={2}
                  label="Prénom"
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <InputComponent
                  value={email}
                  readonly={true}
                  withIcon={true}
                  key={3}
                  label="Email"
                  inputType="email"
                />
                <InputComponent
                  value={number}
                  readonly={true}
                  withIcon={true}
                  key={4}
                  label="Numero de téléphone"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <InputComponent
                  value={date}
                  inputType="text"
                  readonly={true}
                  key={3}
                  label="Date de naissance"
                />
                <InputComponent
                  value={sexe}
                  inputType="text"
                  readonly={true}
                  key={4}
                  label="Sexe"
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <InputComponent value={nina} key={5} label="Numéro nina" />
                <InputComponent
                  key={1}
                  label="Adresse complete"
                  value={address}
                  readonly={true}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {ninaFile.length > 10 ? (
                  <div>
                    <Label>Carte nina ou fiche individuelle</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center flex-1 cursor-pointer justify-end p-4 h-[38px] border-[1px] rounded-sm">
                        <a
                          target="_blank"
                          href={`${process.env.BASE_URL}${ninaFile}`}
                          className="flex items-center justify-between flex-1 space-x-2"
                        >
                          <p className="text-sm">Télécharger </p>
                          <FaDownload className="h-12 mr-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label>Carte nina ou fiche individuelle</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center flex-1   justify-end p-4 h-[38px] border-[1px] rounded-sm">
                        <div
                          target="_blank"
                          className="flex items-center justify-between flex-1 space-x-2 text-red-500"
                        >
                          <p className="text-sm">Non renseigné </p>
                          <RiAlertLine className="h-12 mr-4 " />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <ButtonComponent
            href={"/user/profile"}
            key={8}
            label="Modifier le compte"
            full={true}
            className="self-end w-full mt-8 md:w-[200px]"
          />
        </CardFooter>
      </Card>
      <form
        onSubmit={createApply}
        encType="multipart/form-data"
        className="flex-1 my-10 "
      >
        <Card>
          <CardHeader className="mb-4">
            <CardTitle>Les informations a renseigné pour le concours</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
              tincidunt neque. Pellentesque vitae commodo justo. Integer tempor
              Pellentesque vitae Integer tempor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ModalInfo title="Alert" body={modalData} />
            <div className="grid items-center w-full gap-4">
              <div className="grid gap-6 md:grid-cols-2">
                <InputComponent
                  value={diplome}
                  handleChange={(e) => setDiplome((x) => (x = e.target.value))}
                  key={7}
                  label="Diplôme de nationalité"
                />
                <InputComponent
                  value={study}
                  handleChange={(e) => setStudy((x) => (x = e.target.value))}
                  key={8}
                  label="Filiere"
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <InputComponent
                  value={speciality}
                  handleChange={(e) =>
                    setSpeciality((x) => (x = e.target.value))
                  }
                  key={9}
                  label="Spécialité"
                />
                <InputComponent
                  value={placeOfGraduation}
                  handleChange={(e) =>
                    setPlaceOfGraduation((x) => (x = e.target.value))
                  }
                  key={10}
                  label="Lieu d’optention du diplôme"
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <InputComponent
                  value={countryOfGraduation}
                  handleChange={(e) =>
                    setCountryOfGraduation((x) => (x = e.target.value))
                  }
                  key={11}
                  label="Pays d’optention du diplôme"
                />
                <InputComponent
                  value={diplomeNumber}
                  handleChange={(e) =>
                    setDiplomeNumber((x) => (x = e.target.value))
                  }
                  key={12}
                  label="Numero du diplôme"
                />
              </div>
              <div className="py-4 mt-4 mb-4 border-t-2 border-black">
                <CardTitle className="mb-2 text-blue-500">
                  Les pieces jointes
                </CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  at tincidunt neque. Pellentesque vitae commodo justo. Integer
                  tempor Pellentesque vitae Integer tempor
                </CardDescription>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <InputComponent
                  checkFileIcon={birthDateFile != ""}
                  handleChange={(e) => {
                    setBirthDateFile(e.target.files[0]);
                  }}
                  key={11}
                  inputType="file"
                  label="Une copie d'acte de naissance"
                  subLabel="Une copie d'acte de naissance ou  jugement supplétif en tenant lieu"
                />

                <InputComponent
                  checkFileIcon={cassierFile != ""}
                  handleChange={(e) => {
                    setCassierFile(e.target.files[0]);
                  }}
                  key={11}
                  inputType="file"
                  label="Un extrait du casier judiciare"
                  subLabel="Datant d'au moins de trois(3) mois"
                />

                <InputComponent
                  checkFileIcon={certificatVie != ""}
                  handleChange={(e) => {
                    setCertificatVie(e.target.files[0]);
                  }}
                  key={11}
                  inputType="file"
                  label="Un certificat de bonne vie et moeurs"
                  subLabel="Un certificat de bonne vie et moeurs valide"
                />

                <InputComponent
                  checkFileIcon={certificate != ""}
                  handleChange={(e) => {
                    setCertificate(e.target.files[0]);
                  }}
                  key={11}
                  inputType="file"
                  label="Un certificat de nationalité malienne"
                  subLabel="Un certificat valide"
                />

                <InputComponent
                  checkFileIcon={certificatVisite != ""}
                  handleChange={(e) => {
                    setCertificatVisite(e.target.files[0]);
                  }}
                  key={11}
                  inputType="file"
                  label="Un certificat de visite et contre visite "
                  subLabel="Délivré par une  autorité médicale agréée"
                />
                <InputComponent
                  checkFileIcon={diplomeFile != ""}
                  handleChange={(e) => {
                    setDiplomeFile(e.target.files[0]);
                  }}
                  key={11}
                  inputType="file"
                  label="Une copie certifiée conforme du diplome riquis et son équivalence"
                  subLabel="pour les diplomes étrangers"
                />
              </div>

              <div className="py-4 mt-4 mb-4 border-t-2 border-black ">
                <CardTitle className="mb-2 text-green-500 ">
                  Les Diplômes
                </CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  at tincidunt neque. Pellentesque vitae commodo justo. Integer
                  tempor Pellentesque vitae Integer tempor
                </CardDescription>
              </div>
 
              <div className="grid gap-6 md:grid-cols-2">

                {defCheck == true &&  ( <InputComponent
                  checkFileIcon={defFile != ""}
                  handleChange={(e) => {
                    setDefFile(e.target.files[0]);
                  }}
                  key={11}
                  inputType="file"
                  label="DEF"
                />)  }
                {bacCheck == true &&  ( <InputComponent
                  checkFileIcon={bacFile != ""}
                  handleChange={(e) => {
                    setBacFile(e.target.files[0]);
                  }}
                  key={11}
                  inputType="file"
                  label="Bac"
                />)  }
                {licenceCheck == true &&  ( <InputComponent
                  checkFileIcon={licenceFile != ""}
                  handleChange={(e) => {
                    setLicenceFile(e.target.files[0]);
                  }}
                  key={11}
                  inputType="file"
                  label="Licence"
                />)  }
                {master1Check == true &&  ( <InputComponent
                  checkFileIcon={master1File != ""}
                  handleChange={(e) => {
                    setMaster1File(e.target.files[0]);
                  }}
                  key={11}
                  inputType="file"
                  label="Master 1"
                />)  }
                {master2Check == true &&  ( <InputComponent
                  checkFileIcon={master2File != ""}
                  handleChange={(e) => {
                    setMaster2File(e.target.files[0]);
                  }}
                  key={11}
                  inputType="file"
                  label="Master 2"
                />)  }
                
              </div>

              
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <ButtonComponent
              handleClick={() => {}}
              key={8}
              label="Postuler"
              full={true}
              type="submit"
              className="self-end w-full mt-4 md:w-[200px]"
            />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
