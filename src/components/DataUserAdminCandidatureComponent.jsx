"use client";
import React, { useState, useEffect } from "react";

import { CustomerService } from "../Services/Candidature";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import parse from "html-react-parser";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";

 

const statutOptions = [
  {
    label: "En cours de validation",
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
const sexeOptions = [{
  label :"Homme",value:0,
},
{
  label :"Femme",value:1,
}
]
const columns = [
 
  {
    name: "Nom",
    selector: (row) => row.author.lastName,
    format: (row) => row.author.lastName.toUpperCase(),
    
    sortable: true,
  },
  {
    name: "Prénom",
   selector: (row) => row.author.firstName,
    format: (row) => row.author.firstName.toUpperCase(),
   
  },
  {
    name: "Téléphone",
    selector: (row) =>row.author.number,
    
   // format: (row) => parse(row.content.substring(0,70)  || ""),
  },
  {
    name: "Genre",
    selector: (row) =>row.author.sexe,
    cell: row => (<div className={`p-1  rounded-md `} >{ sexeOptions[0].label }</div>),
   // format: (row) => parse(row.content.substring(0,70)  || ""),
  },
  {
    name: "Statut",
    selector: (row) => row.id,
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

export default function DataUserAdminCandidatureComponent({datas}) {

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
    <div>
      <div className="hidden md:block">
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
          className="border-2 rounded"
          columns={columns}
          data={datas}
          onRowClicked={  row => {
          
            const user = {
              firstName:row.author.firstName,
              lastName:row.author.lastName,
              birthDate:row.author.birthDate,
              sexe:row.author.sexe,
              email:row.author.email,
              number:row.author.number,
              nina:row.author.nina,
             
            }
          
        //    alert(JSON.stringify(user));
        //  return
     /*        router.replace(`/user/candidatures/${row.id}`,{
              query: { data: row },
            }) */
            router.push(`/admin/apply/${row.id}?data=${JSON.stringify(row)}&user=${JSON.stringify(user)}`,
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
