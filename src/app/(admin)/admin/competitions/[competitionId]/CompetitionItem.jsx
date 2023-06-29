"use client";
import React, { useState, useRef } from "react";
import ButtonComponent from "../../../../../components/ButtonComponent";
import InputComponent from "../../../../../components/InputComponent";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Switch } from "@/components/ui/switch";
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AiFillPicture } from "react-icons/ai";
import { Dropdown } from "primereact/dropdown";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { convertFromHTML, convertToHTML } from "draft-convert";
import { redirect, useRouter } from "next/navigation";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

function EditorComponent({ value, handleChange }) {
  return (
    <div className="bg-[#F8F9FA] min-h-[500px]  mb-6 p-2 shadow-lg">
      <Editor
        editorState={value}
        onEditorStateChange={(newState) => {
          handleChange(newState);
        }}
      />
    </div>
  );
}
function CompetitionItem({ params, data }) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const imageRef = useRef(null);
  const [image, setImage] = useState(data.image);
  const [title, setTitle] = useState(data.title);
  const [ageMax, setAgeMax] = useState(data.ageMax);
  const [ageMin, setAgeMin] = useState(data.ageMin);

  const [content, setContent] = useState(
    EditorState.createWithContent(convertFromHTML(data.content))
  );

  const statutData = [
    { name: "Brouillon", code: "0" },
    { name: "Ouvert", code: "1" },
    { name: "Fermé", code: "2" },
    { name: "Suspendu", code: "3" },
  ];

  const [def, setDef] = useState(data.def);
  const [bac, setBac] = useState(data.bac);
  const [licence, setLicence] = useState(data.licence);
  const [master1, setMaster1] = useState(data.master1);
  const [master2, setMaster2] = useState(data.master2);
  
  const [statut, setStatutSelect] = useState(statutData[data.statut]);
  const [startDateAt, setStartDateAt] = useState(data.startDateAt);
  const [endDateAt, setEndDateAt] = useState(data.endDateAt);

  const updateData = async (e) => {
    e.preventDefault();
    
    
    /*  alert(content.getCurrentContent())
    return */
   

    const valueContent = convertToHTML(content.getCurrentContent());

    const formData = new FormData();

    formData.append("image", image);
    formData.append("imageUpdate", image != data.image ? true : false);


    formData.append("title", title);
    formData.append("ageMax", ageMax);
    formData.append("ageMin", ageMin);
    formData.append("valueContent", valueContent);
    formData.append("startDateAt", startDateAt);
    formData.append("endDateAt", endDateAt);
    formData.append("statut", statut.code);

    formData.append("def", def);
    formData.append("bac", bac);
    formData.append("licence", licence);
    formData.append("master1", master1);
    formData.append("master2", master2);

    formData.append("id", params.competitionId);
    const res = await fetch(`/api/admin/competition`, {
      body: formData,
      
      method: "PUT",
    });

    const dataNew = await res.json();
    if (dataNew.user) {
      alert("le concours est modifier");
    }
  };

  const deleteData = async (e) => {
    e.preventDefault();

    /*  alert(content.getCurrentContent())
    return */
    const valueContent = convertToHTML(content.getCurrentContent());
    const res = await fetch(
      `/api/admin/competition?id=${params.competitionId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.user) {
      alert("le concours est supprimer");
      router.replace("/admin/competitions");
    }
  };

  /* http://localhost:3000${image} */
  return (
    <form onSubmit={(e) => updateData(e)} className="flex flex-col">
      <p className="mb-2 text-lg font-bold">Phtoto de couverture</p>
      <picture
        onClick={() => {
          imageRef.current.click();
        }}
        className="w-full cursor-pointer h-[360px] mb-6 bg-gray-100 flex  justify-center border items-center border-dashed do rounded-lg "
      >
        {image != data.image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="image"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <img
            src={`http://localhost:3000${image}`}
            alt="image"
            className="object-cover w-full h-full rounded-lg"
          />
        )}
      </picture>

      <input
        className="hidden block w-full p-2 text-sm text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        ref={imageRef}
        onChange={(e) => {
          if (!e.target.files[0].type.startsWith("image/")) return;
          setImage(e.target.files[0]);
        }}
      />
      <InputComponent
        key={1}
        label={"Titre"}
        value={title}
        handleChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <div className="flex w-full gap-4 my-4">
        <div className="flex flex-col w-full">
          <p className="text-[14px] text-gray-500 font-semibold mb-2  overflow-ellipsis">
            Statut
          </p>
          <Dropdown
            value={statut}
            onChange={(e) => setStatutSelect(e.value)}
            options={statutData}
            optionLabel="name"
            placeholder="Type de statut"
            className="w-full md:w-14rem"
          />
        </div>
      </div>
      <div className="flex w-full gap-4 my-2">
        <div className="flex gap-4 ">
          <div className="flex flex-col w-full">
            <p className="text-[14px] text-gray-500 font-semibold mb-2  overflow-ellipsis">
              Date debut
            </p>
            <div className="flex w-full card justify-content-center">
              <Calendar
                value={startDateAt}
                className="w-full"
                onChange={(e) => setStartDateAt(e.value)}
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-[14px] text-gray-500 font-semibold mb-2  overflow-ellipsis">
              Date fin
            </p>
            <div className="flex w-full card justify-content-center">
              <Calendar
                value={endDateAt}
                className="w-full"
                onChange={(e) => setEndDateAt(e.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 ">
          <InputComponent
            key={2}
            label={"Age minimum"}
            value={ageMin}
            inputType="number"
            handleChange={(e) => {
              setAgeMin(e.target.value);
            }}
          />
          <InputComponent
            key={3}
            label={"Age maximum"}
            value={ageMax}
            inputType="number"
            handleChange={(e) => {
              setAgeMax(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex self-end flex-col w-[380px] mt-4 space-y-4 border-2 p-4">
        
        <h1 className="font-bold text-md">
          Les documents a fournir pour le concours
        </h1>
   

        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Def</p> <Switch checked={def}
                      onCheckedChange={(x) =>setDef(x => x=!x)}   />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Bac</p> <Switch checked={bac}
                      onCheckedChange={(x) =>setBac(x => x=!x)} />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Licence</p> <Switch checked={licence}
                      onCheckedChange={(x) =>setLicence(x => x=!x)} />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Master 1</p> <Switch checked={master1}
                      onCheckedChange={(x) =>setMaster1(x => x=!x)} />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Master 2</p> <Switch checked={master2}
                      onCheckedChange={(x) =>setMaster2(x => x=!x)} />
        </div>
      </div>

      <p className="text-[14px] text-gray-500 mt-8">
        <EditorComponent value={content} handleChange={(v) => setContent(v)} />
      </p>

      <div className="flex items-end justify-end w-full gap-2 my-4">
        <ButtonComponent
          key={4}
          label="Supprimer"
          className="max-w-[130px] bg-red-400 rounded-md "
          type="button"
          handleClick={deleteData}
          full={true}
        />
        <ButtonComponent
          key={4}
          label="Modifier"
          className="max-w-[130px]  "
          type="submit"
          full={true}
        />
      </div>
    </form>
  );
}

export default CompetitionItem;
