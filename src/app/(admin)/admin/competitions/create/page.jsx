"use client"
import React, { useState,useRef } from "react";
import ButtonComponent from "../../../../../components/ButtonComponent";
import InputComponent from "../../../../../components/InputComponent";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { EditorState,ContentState, convertFromRaw,convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AiFillPicture } from "react-icons/ai";
import { Dropdown } from "primereact/dropdown";
import { Calendar ,CalendarChangeEvent} from "primereact/calendar";
import { convertToHTML } from 'draft-convert';
import { redirect } from "next/navigation";
 
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
       editorState={value}    onEditorStateChange={newState => {
handleChange(newState)
      }}    />
    </div>
  );
}
function CreateCompetition() {


  const [visible, setVisible] = useState(false);
  const imageRef = useRef(null)
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [content, setContent] = useState(EditorState.createEmpty());
  const [statut, setStatutSelect] = useState( { name: "Brouillon", code: "0" },);
  const [startDateAt, setStartDateAt] = useState(null);
  const [endDateAt, setEndDateAt] = useState (null); 
  const statutData = [
    { name: "Brouillon", code: "0" },
    { name: "Ouvert", code: "1" },
    { name: "Fermé", code: "2" },
    { name: "Suspendu", code: "3" },
  ];

  const createData = async (e) => {
    
 
    e.preventDefault()
    
   const valueContent = convertToHTML(content.getCurrentContent()); 
   
   const formData  = new FormData();

   formData.append("image",image)
   formData.append("title",title)
   formData.append("ageMax",ageMax)
   formData.append("ageMin",ageMin)
   formData.append("valueContent",valueContent)
   formData.append("startDateAt",startDateAt)
   formData.append("endDateAt",endDateAt)
   formData.append("statut",statut.code)
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
  
  const res =  await fetch(`/api/admin/competition`, {
    body:  formData,
     
      
      method: "POST",
    }) 
    const data = await res.json()
    console.log(data);
/* 
       redirect("/admin") */
  };

  return (
    <form   encType="multipart/form-data" onSubmit={(e)=>createData(e)} className="flex flex-col">
      <p className="mb-2 text-lg font-bold">Phtoto de couverture</p>
      <picture
      onClick={()=>{
        imageRef.current.click()
       }}
      className="w-full cursor-pointer h-[360px] mb-6 bg-gray-100 flex  justify-center border items-center border-dashed do rounded-lg ">
     

     {image ?  (
          <img
       
          src={ URL.createObjectURL(image)} 
             
                  alt="image"
                  className="object-cover w-full h-full rounded-lg"
                />
     ) :  <AiFillPicture className="w-12 h-12" /> }
      </picture>
  
      <input
           
           className="block w-full p-2 text-sm text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
           type="file" ref={imageRef} 
           
           
           onChange={(e)=>{

            if(!e.target.files[0].type.startsWith("image/")) return;
            setImage(e.target.files[0])
           }} />
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
                onChange={(e) =>  setStartDateAt(e.value)}
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
        }}/>
          <InputComponent
           key={3}
        label={"Age maximum"}
        value={ageMax}
        inputType="number"
        handleChange={(e) => {
          setAgeMax(e.target.value);
        }}/>
        </div>
      </div>
 
      <p className="text-[14px] text-gray-500 mt-8">
        <EditorComponent
          value={content}
          handleChange={ (v)=>setContent(v)}
        />
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
