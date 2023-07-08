"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{ marginBottom: "10px" }}>
          N° ENREGISTREMENT : {data?.numeroRef}{" "}
        </Text>
        <Text style={{ marginBottom: "20px" }}>
          DATE DEPOT : {data?.createdAt}{" "}
        </Text>
        <View
          style={{
            marginBottom: "10px",
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
          {InfoInput("Date de naissance", data?.birthDate)}
          {InfoInput("Lieu de naissance", data?.placeBirthDate)}
          {InfoInput("Sexe", data?.sexe)}
          {InfoInput("Adresse", data?.address)}
        </View>

        <View
          style={{
            marginBottom: "10px",
            paddingBottom: "5px",
            borderBottom: "solid",
            borderBottomColor: "black",
            borderBottomWidth: "2px",
          }}
        >
          <Text style={{ marginBottom: "10px" }}>
            Les informations a renseigné pour le concours
          </Text>
        </View>
        <View
          style={{
            marginBottom: "10px",
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
      </View>
    </Page>
  </Document>
);

function InfoInput(label, value) {
  return (
    <View
      style={{
        marginBottom: "10px",
        fontSize: "14px",
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
const generatePdfDocument = async (documentData, fileName, data) => {
  const blob = await pdf(
    <MyDocument data={data} title="My PDF" pdfDocumentData={documentData} />
  ).toBlob();
  saveAs(blob, fileName);
};

function UserPdf({ data }) {
  const [isClient, setIsClient] = useState(false);
  const [textUrl, setTextUrl] = useState("");

  const [datas, setDatas] = useState(data);

  useEffect(() => {
    setIsClient(true);

    if (isClient) {
    }
  }, [isClient]);
  return (
    <div>
      {JSON.stringify(datas)}

      {isClient && (
        <PDFViewer width="100%" height="1000px">
          <MyDocument data={datas} />
        </PDFViewer>
      )}
      {isClient && (
        <div>
          <MyDocument />
          <button onClick={() => generatePdfDocument(data)}>
            Télécharger le recipissé
          </button>
        </div>
      )}
    </div>
  );
}
export default UserPdf;
