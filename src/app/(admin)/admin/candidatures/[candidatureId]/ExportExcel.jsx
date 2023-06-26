"use client"
import React, { useMemo } from "react";
import Export from "react-data-table-component";
import DataUserAdminCandidatureComponent from "../../../../../components/DataUserAdminCandidatureComponent";
import XLSX from "xlsx";
import ExcelJS from "exceljs";

function ExportExcel({datas} ) {
   
  const exportFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Candidatures");
    sheet.properties.defaultRowHeight = 20;
    sheet.columns = [
     /*  {
        header: "Id",
        key: "id",
        width: 40,
      }, */
      {
        header: "Nom",
        key: "lastName",
        width: 40,
      },
      {
        header: "Prenom",
        key: "firstName",
        width: 40,
      },
      {
        header: "Téléphone",
        key: "number",
        width: 40,
      },
      {
        header: "Genre",
        key: "sexe",
        width: 40,
      },
      {
        header: "Statut",
        key: "statut",
        width: 40,
      },
    ];

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

    datas.map((item) => {
      sheet.addRow({
        id: item.id,
        lastName: item.author.lastName,
        firstName: item.author.firstName,
        number: item.author.number,
        sexe: sexeOptions[item.author.sexe].label,
        statut: statutOptions[item.statut].label,
      });
    });
    workbook.xlsx.writeBuffer().then(data=>{
      const blob = new Blob([data],{
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = "download.xlsx"
      anchor.click()
      window.URL.revokeObjectURL(url)
    })
  };


  return (
   
      <div onClick={exportFile}   className="p-2 border-2 rounded cursor-pointer max-w-max">
        Exporter la liste 
      </div>

      
  );
}

export default ExportExcel;
