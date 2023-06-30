import React from "react"; 
import DataUserAdminCandidatureComponent from "../../../../../components/DataUserAdminCandidatureComponent";
import XLSX from "xlsx";
import ExcelJS from "exceljs";
import ExportExcel from "./ExportExcel";
export const dynamic = "force-dynamic"
async function page({
  params,
}: {
  params: {
    candidatureId: string;
  };
}) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/admin/competition?id=${params.candidatureId}`,
    { cache:"no-store" }
  );
  const datas: any[] = await res.json();
 
  return (
    <div className="flex flex-col flex-1 w-full ">
      <ExportExcel datas={datas}  />

      <DataUserAdminCandidatureComponent datas={datas} />
    </div>
  );
}

export default page;
