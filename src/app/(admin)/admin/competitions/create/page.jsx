"use client";
import React, { useState, useRef } from "react";
import ButtonComponent from "../../../../../components/ButtonComponent";
import InputComponent from "../../../../../components/InputComponent";
import { XCircleIcon } from "@heroicons/react/24/solid";
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
import { convertToHTML } from "draft-convert";
import { v4 as uuidv4 } from 'uuid';
import { Switch } from "@/components/ui/switch";
import { redirect, useRouter } from "next/navigation";
import AlertModalResponse from "@/components/Modals/AlertModalResponse";
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
function CreateCompetition() {
  const [visible, setVisible] = useState(false);
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [letterNumber, setLetterNumber] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [content, setContent] = useState(EditorState.createEmpty());
  const [statut, setStatutSelect] = useState({ name: "Brouillon", code: "0" });
  const [startDateAt, setStartDateAt] = useState(null);
  const [endDateAt, setEndDateAt] = useState(null);
  const statutData = [
    { name: "Brouillon", code: "0" },
    { name: "Ouvert", code: "1" },
    { name: "Fermé", code: "2" },
    { name: "Suspendu", code: "3" },
  ];
  const router = useRouter();
  const [orderOfMagistrates, setOrderOfMagistrates] = useState(false);
  const [def, setDef] = useState(false);
  const [bac, setBac] = useState(false);
  const [fileNameRequired, setFileNameRequired] = useState("");
  const [curentFileItem, setCurentFileItem] = useState();
  const [filesRequired, setFilesRequired] = useState([]);
  const [licence, setLicence] = useState(false);
  const [maitrise, setMaitrise] = useState(false);
  const [master1, setMaster1] = useState(false);
  const [master2, setMaster2] = useState(false);
  const showDialogClick = useRef(null)
  const [message, setMessage] = useState("");
  const createData = async (e) => {
    e.preventDefault();

    const valueContent = convertToHTML(content.getCurrentContent());

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("ageMax", ageMax);
    formData.append("letterNumber", letterNumber);
    formData.append("ageMin", ageMin);
    formData.append("valueContent", valueContent);
    formData.append("startDateAt", startDateAt);
    formData.append("endDateAt", endDateAt);
    formData.append("statut", statut.code);

    formData.append("orderOfMagistrates", orderOfMagistrates);
    formData.append("filesRequired", JSON.stringify(filesRequired));
    formData.append("def", def);
    formData.append("bac", bac);
    formData.append("licence", licence);
    formData.append("maitrise", maitrise);
    formData.append("master1", master1);
    formData.append("master2", master2);
    /*  body: JSON.stringify({
        image,
        title,
        ageMax,
        ageMin,
        valueContent,
        startDateAt,
        endDateAt,
        statut,
      }), */

    const res = await fetch(`/api/admin/competition`, {
      body: formData,

      method: "POST",
    });
    const data = await res.json();
    
    if (res.status == 200) {
      

      showDialogClick.current.click()
      setMessage("Le concours est creer")
    }
    /* 
       redirect("/admin") */
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e) => createData(e)}
      className="flex flex-col"
    >
      <AlertModalResponse title="" refModal={showDialogClick} message={message} handleClick={()=>{ 
 router.refresh()
 router.push("/admin/competitions")

       }}  />
      <p className="mb-2 text-lg font-bold">Phtoto de couverture</p>
      <picture
        onClick={() => {
          imageRef.current.click();
        }}
        className="w-[870px] cursor-pointer h-[400px] mb-6 bg-white flex  justify-center border items-center border-dashed do rounded-lg "
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="image"
            className="object-contain w-full h-full rounded-lg"
          />
        ) : (
          <AiFillPicture className="w-12 h-12" />
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
        
        <InputComponent
                    value={startDateAt}
                    handleChange={(e) => {
                      setStartDateAt(e.target.value);
                    }}
                   
                    withIcon={true}
                    key={4}
                    inputType="date"
                    label="Date debut"
                  />
          <InputComponent
                    value={endDateAt}
                    handleChange={(e) => {
                      setEndDateAt(e.target.value);
                    }}
                   
                    withIcon={true}
                    key={4}
                    inputType="date"
                    label="Date fin"
                  />
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
      <h1 className="flex items-center justify-between mb-4 font-bold text-md">
       
        
        <InputComponent
            key={3}
            label={"Lettre de référence"}
            value={letterNumber}
            inputType="text"
            handleChange={(e) => {
              setLetterNumber(e.target.value);
            }}
          />
        </h1>
        
        <h1 className="flex items-center justify-between font-bold text-md">
        <p className="font-semibold text-md">Ordre des magistrats</p> <Switch checked={orderOfMagistrates}
                      onCheckedChange={(x) =>setOrderOfMagistrates(x => x=!x)}   />
        </h1>

       
   
       {/*  
        <h1 className="font-bold text-md">
          Les documents a fournir pour le concours
        </h1>
    */}

       {/*  <div className="flex items-center justify-between">
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
          <p className="font-semibold text-md">Maitrise</p> <Switch checked={maitrise}
                      onCheckedChange={(x) =>setMaitrise(x => x=!x)} />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Master 1</p> <Switch checked={master1}
                      onCheckedChange={(x) =>setMaster1(x => x=!x)} />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-md">Master 2</p> <Switch checked={master2}
                      onCheckedChange={(x) =>setMaster2(x => x=!x)} />
        </div> */}
      </div>


      <div className="flex self-end flex-col w-[580px] mt-4 space-y-2 border-2 p-4">
      <div className="flex items-end justify-between mb-4 font-bold text-md">
        
        
        <InputComponent
            key={10}
            label={"Les pièces à fournir"}
            value={fileNameRequired}
            inputType="text"
            handleChange={(e) => {
              setFileNameRequired(x=> x= e.target.value);
            }}
          />

<div className="flex flex-row items-end justify-end flex-1 mb-1">
<div onClick={(e)=>{

if(curentFileItem){
  const nextShapes = filesRequired.map(shape => {
    if (shape.id != curentFileItem.id) {
      // No change
      return shape;
    } else {
      // Return a new circle 50px below
      return {
        ...shape,
        name:   fileNameRequired,
      };
    }
  });
  // Re-render with the new array
  setFilesRequired(nextShapes);
  setFileNameRequired(x => x ="")
  setCurentFileItem(x => x =null)
  return;
}



            setFilesRequired( prev => [...prev,{
              id:uuidv4(),
              value:"",
              name:fileNameRequired,type:"file"}])
            setFileNameRequired(x => x ="")
          }} className="self-end p-2 ml-2 text-xs text-white bg-green-500 rounded-sm">{curentFileItem ? "Modifier" :"Ajouter"}  </div>
   {curentFileItem &&       <div onClick={()=>{
   
   setFileNameRequired(x => x ="")
   setCurentFileItem(x => x =null)
 }} className="self-end p-2 ml-2 text-xs text-white bg-red-500 rounded-sm">X</div>}

</div>


       </div>
      
   {filesRequired.map(item=>(
   <div className="flex items-center justify-center p-2 border"> <p className="flex-1">{item.name}</p> <div className="flex"><div onClick={()=>{
   
    setFileNameRequired(x => x =item.name)
    setCurentFileItem(x => x =item)
  }} className="self-end p-2 ml-2 text-xs text-white bg-blue-500 rounded-sm">Modifier</div>
  
  <div onClick={()=>{

setFilesRequired((current) =>
current.filter((fruit) => fruit.id !== item.id)
);

setFileNameRequired(x => x ="")
setCurentFileItem(x => x =null)

 
 }} className="self-end p-2 ml-2 text-xs text-white bg-red-500 rounded-sm">X</div>
   </div>  </div>
   ))}

       
    
      </div>






      <p className="text-[14px] text-gray-500 mt-8">
        <EditorComponent value={content} handleChange={(v) => setContent(v)} />
      </p>

      <div className="flex items-end justify-end w-full my-4">
        {!visible ? (
          <ButtonComponent
            key={4}
            label="Enregistré"
            className="max-w-[130px]  "
            type="submit"
            full={true}
          />
        ) : null}
      </div>
    </form>
  );
}

export default CreateCompetition;
