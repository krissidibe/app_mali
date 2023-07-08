"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
/* import ExperienceProModel from './ExperienceProModel';
 */

// Create styles
const styles = StyleSheet.create({
  page: { backgroundColor: "white" },
  section: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    margin: 30,
    color: "black",
  },
});

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
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
      {InfoInput("N° ENREGISTREMENT", data?.numeroRef)}
      {InfoInput("Date du dépôt",  `${dayjs(data?.createdAt).format("DD/MM/YYYY")}`  )}
      {InfoInput("Etat",  `${statutOptions[parseInt(data?.statut ?? 0)].label} `  )}
       
       
        <View
          style={{
            marginBottom: "10px",
            marginTop:"5px",
            paddingBottom: "5px",
            borderBottom: "solid",
            borderBottomColor: "black",
            borderBottomWidth: "2px",
          }}
        >
          {InfoInput("Nom", data?.firstName)}
          {InfoInput("Prénom", data?.firstName)}
          {InfoInput("Email", data?.email)}
          {InfoInput("Téléphone", data?.number)}
          {InfoInput("Date de naissance",dayjs(data?.birthDate).format("DD/MM/YYYY")   )}
          {InfoInput("Lieu de naissance", data?.placeBirthDate)}
          {InfoInput("Sexe", data?.sexe)}
          {InfoInput("Adresse", data?.address)}
          {InfoInput("NINA", data?.nina)}
        </View>

        <View
          style={{
            marginBottom: "6px",
            paddingBottom: "5px",
            borderBottom: "solid",
            borderBottomColor: "black",
            borderBottomWidth: "2px",
          }}
        >
          <Text style={{ marginBottom: "10px" }}>
            Les informations pour le concours
          </Text>
        </View>
        <View
          style={{
            marginBottom: "5px",
            paddingBottom: "5px",
            borderBottom: "solid",
            borderBottomColor: "black",
            borderBottomWidth: "2px",
          }}
        >
              {InfoInput("Diplôme de nationalité", data?.diplome)}
          {InfoInput("Filiere", data?.study)}
          {InfoInput("Spécialité", data?.speciality)}
          {InfoInput("Lieu d’optention du diplôme", data?.placeOfGraduation)}
          {InfoInput("Pays d’optention du diplôme", data?.countryOfGraduation)}
          {InfoInput("Numero du diplôme", data?.diplomeNumber)}

        </View>
        <View
          style={{
            marginBottom: "5px",
            paddingBottom: "5px",
            borderBottom: "solid",
            borderBottomColor: "black",
            borderBottomWidth: "2px",
          }}
        >
          <Text style={{ marginBottom: "10px" }}>
          Les pieces jointes

          </Text>
        </View>
        <View
          style={{
            marginBottom: "5px",
            paddingBottom: "5px",
            borderBottom: "solid",
            borderBottomColor: "black",
            borderBottomWidth: "2px",
          }}
        >
               
          {InfoInputFile("Une copie d'acte de naissance", data?.birthDateFile)}
          {InfoInputFile("Un extrait du casier judiciare", data?.cassierFile)}
          {InfoInputFile("Un certificat de bonne vie et moeurs", data?.certificatVie)}
          {InfoInputFile("Un certificat de nationalité malienne", data?.certificate)}
          {InfoInputFile("Un certificat de visite et contre visite", data?.certificatVisite)}
          {InfoInputFile("Une copie certifiée conforme du diplome riquis", data?.diplomeFile)}
         
         

        </View>
 
        <View
          style={{
           
          }}
        >
           
               
          { data?.def.toString().includes("files/")  &&  InfoInputFile("DEF", data?.def)}
          { data?.bac.toString().includes("files/")  &&  InfoInputFile("BAC", data?.bac)}
          { data?.licence.toString().includes("files/")  &&  InfoInputFile("LICENCE", data?.licence)}
          { data?.maitrise.toString().includes("files/")  &&  InfoInputFile("MAITRISE", data?.maitrise)}
          { data?.master1.toString().includes("files/")  &&  InfoInputFile("MASTER1", data?.master1)}
          { data?.master2.toString().includes("files/")  &&  InfoInputFile("MASTER2", data?.master2)}
          
       
 

        </View>
      </View>
    </Page>
  </Document>
);

function InfoInput(label, value) {
  return (
    <View
      style={{
        marginBottom: "10px",
        fontSize: "12px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text>{label} :</Text>
      <Text>{value}</Text>
    </View>
  );
}
function InfoInputFile(label, value = false) {
  return (
    <View
      style={{
        marginBottom: "10px",
        fontSize: "12px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text>{label} :</Text>
      <Text>{value.toString().includes("files/")  ? "Oui" :"Non"}</Text>
    </View>
  );
}

function _buildExperienceItem(e) {
  return (
    <View style={{ marginBottom: "10px " }}>
      <Text style={{ fontWeight: "bold", fontSize: "18px" }}>
        {e.firstName}{" "}
      </Text>
      <Text style={{ fontWeight: "semibold" }}>{e.company} </Text>
      <Text style={{ opacity: "0.8" }}>{e.period} </Text>
      <Text>{e.content} </Text>
    </View>
  );
}


function UserPdf({ data }) {
  const [isClient, setIsClient] = useState(false);
  const [textUrl, setTextUrl] = useState("");

  const [datas, setDatas] = useState(data);
  const generatePdfDocument = async (documentData, fileName, data) => {
    const blob = await pdf(
      <MyDocument data={datas} title="My PDF" pdfDocumentData={documentData} />
    ).toBlob();
    saveAs(blob, fileName);
  };
  useEffect(() => {
    setIsClient(true);

    if (isClient) {
    }
  }, [isClient]);
  return (
    <div>
      
{/* 
      {isClient && (
        <PDFViewer width="100%" height="1000px">
          <MyDocument data={datas} />
        </PDFViewer>
      )} */}
      {isClient && (
        <div>
         {/*  <MyDocument /> */}
          <button className="p-4 border-2 rounded-sm" onClick={() => generatePdfDocument(data)}>
            Télécharger le recipissé
          </button>
        </div>
      )}
    </div>
  );
}
export default UserPdf;
