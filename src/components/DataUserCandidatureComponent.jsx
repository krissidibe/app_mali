"use client";
import React, { useState, useEffect } from "react";

import { CustomerService } from "../Services/Candidature";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import parse from "html-react-parser";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";

 

const statutOptions = [
  {
    label: "En attente de traitement",
    value: 0,
    color: "bg-yellow-500",
  },
  {
    label: "Valider",
    value: 1,
    color: "bg-green-500"
  },
  {
    label: "refuser",
    value: 3,
    color: "bg-red-500"
  },
];

const columns = [
  {
    name: "Intitulé du concours",
   selector: (row) => row.competition.title,
    format: (row) => row.competition.title.toUpperCase(),
   
  },
  {
    name: "Date Fin",
    selector: (row) => row.competition.endDateAt,
    format: (row) => new Date(row.competition.endDateAt).toLocaleDateString("fr-FR"),
    
    sortable: true,
  },
/*   {
    name: "Description",
    selector: (row) => row.competition.content,
    format: (row) => parse(row.competition.content.substring(0,70)  || ""),
  }, */
  {
    name: "Statut",
    selector: (row) => row.statut,
    sortable: true,
    cell: row => (<div className={`p-1 text-white text-[12px] px-2  rounded-md ${statutOptions[row.statut].color } `} >{ statutOptions[row.statut].label }</div>),
  },
];
const mobileColumns = [
  {
    name: "Intitulé du concours",
    selector: (row) => row.competition.title,
    format: (row) => row.competition.title.toUpperCase(),
  },
 
  
  {
    name: "Statut",
    selector: (row) => row.statut,
    sortable: true,
    cell: row => (<div className={`p-1 text-white text-[12px] px-2  rounded-md ${statutOptions[row.statut].color } `} >{ statutOptions[row.statut].label }</div>),
  },
];

const data = [
  {
    id: 1,
    title: "Concours d'entrée medecine",
    dateEnd: "1988",
    description: "description",
    statut: "statut",
  },
  {
    id: 2,
    title: "Concours d'entrée exemple 1",
    dateEnd: "1984",
    description: "description",
    statut: "statut",
  },
  {
    id: 3,
    title: "Concours d'entrée exemple 2",
    dateEnd: "1984",
    description: "description",
    statut: "statut",
  },
  {
    id: 4,
    title: "Concours d'entrée exemple 3",
    dateEnd: "1984",
    description: "description",
    statut: "statut",
  },
  {
    id: 5,
    title: "Concours d'entrée exemple 4",
    dateEnd: "1984",
    description: "description",
    statut: "statut",
  },
];

export default function DataUserCandidatureComponent({datas}) {

  const router = useRouter()
  const [customers, setCustomers] = useState([]);

  const paginatorLeft = <div>k</div>;
  const paginatorRight = <div>k</div>;
 

  useEffect(() => {
    CustomerService.getCustomersMedium().then((data) => setCustomers(data));
  }, []);

  /*   <div className="hidden md:block" >   <DataUserCandidatureComponent isMobileScreen={false} /></div>
  <div className="md:hidden" >   <DataUserCandidatureComponent isMobileScreen={true} /></div> */
  return (
    <div className="w-screen md:w-full md:p-4 ">
      <p>Retrouvez ci-dessous la liste  de vos candidatures. vous pouvez  consulter votre candidature en cliquant sur un enregistrement ou télécharger votre le récépissé</p>
      <div className="hidden w-full md:max-w-full md:block">
        {" "}
        <DataTable
          pagination
          subHeader
          subHeaderAlign="right"
          subHeaderWrap
          striped
          fixedHeader={true}
          noHeader={false}
          highlightOnHover
          className="p-0 m-0 border-2 rounded"
          columns={columns}
          data={datas.candidatures}
          onRowClicked={  row => {
            
            const user = {
              firstName:datas.firstName,
              lastName:datas.lastName,
              birthDate:datas.birthDate,
              sexe:datas.sexe,
              email:datas.email,
              number:datas.number,
              nina:datas.nina,
              image:datas.image,
             
            }
        //    alert(JSON.stringify(user));
        //  return
     /*        router.replace(`/user/candidatures/${row.id}`,{
              query: { data: row },
            }) */
            router.push(`/user/candidatures/${row.id}`,
              {
                query: { data: row },
              }
              
             )
          }}
        />
      </div>
      <div className="w-full md:hidden">
        {" "}
        <DataTable
          pagination
          subHeader
          subHeaderAlign="right"
          subHeaderWrap
          striped
          fixedHeader={true}
          noHeader={false}
          highlightOnHover
          className="p-0 m-0 border-2 rounded"
          columns={mobileColumns}
          data={datas.candidatures}
          onRowClicked={  row => {
            
            const user = {
              firstName:datas.firstName,
              lastName:datas.lastName,
              birthDate:datas.birthDate,
              sexe:datas.sexe,
              email:datas.email,
              number:datas.number,
              nina:datas.nina,
              image:datas.image,
             
            }
        //    alert(JSON.stringify(user));
        //  return
     /*        router.replace(`/user/candidatures/${row.id}`,{
              query: { data: row },
            }) */
            router.push(`/user/candidatures/${row.id}`,
              {
                query: { data: row },
              }
              
             )
          }}
        />
      </div>
    </div>
  );
}
