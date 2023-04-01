import { ProgressBar, Button } from "react-bootstrap";
import DataTableComponent from "../DataTableComponent/DataTableComponent";
import ModalButton from "../../components/ModalButton/ModalButton";
import axios from "axios";
import { useQueries } from "react-query";
import { FaFileExcel, FaFileDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import { downloadBlobArrayToZip } from "../../utils/helper";
import { useState, useEffect } from "react";

const BUCKET_NAME = "serendib-ui";

const STUDENT_URL = process.env.REACT_APP_WS_HOST + "/student";
const SPONSOR_URL = process.env.REACT_APP_WS_HOST + "/sponsor";

const studentEmptyRow = {
  id: "",
  name: "",
  contactNo: "",
  email: "",
  university: "",
  course: "",
  startDate: "",
  endDate: "",
  sponsor: "",
  files: [],
};
const sponsorEmptyRow = { id: "", name: "", contactNo: "", email: "" };

const modalButtonStyle = {
  borderRadius: "30px",
  height: "30px",
  width: "30px",
  lineHeight: "0px",
  padding: "0",
};

export default function TableComponent(props: any) {
  const [type, setType] = useState("student");
  const WS_URL = props.type === "student" ? STUDENT_URL : SPONSOR_URL;
  const arr = [props.type === "student" ? "student" : "sponsor", "sponsor"];

  useEffect(() => {
    setType(props.type);
  }, []);

  const apis: any[] = useQueries(
    arr.map((s: string) => {
      return {
        queryKey: s,
        queryFn: () =>
          axios
            .get(`${process.env.REACT_APP_WS_HOST}/${s}/`)
            .then((res: any) =>
              res && res.data && res.data.message ? res.data.message : []
            ),
      };
    })
  );

  if (apis.some((result) => result.isLoading)) {
    return (
      <div style={{ backgroundColor: "black", height: "calc(100vh - 60px)" }}>
        <ProgressBar>
          <ProgressBar animated striped variant="success" now={100} key={1} />
        </ProgressBar>
      </div>
    );
  } else if (apis.some((result) => result.error)) {
    return (
      <div style={{ backgroundColor: "black", height: "calc(100vh - 60px)" }}>
        <ProgressBar>
          <ProgressBar
            animated
            label={
              "Error occured when fetching data, please wait for few minutes"
            }
            striped
            variant="danger"
            now={100}
            key={1}
          />
        </ProgressBar>
      </div>
    );
  }

  const columnData = {
    student: {
      columns: [
        {
          key: "id",
          name: "ID",
          width: 10,
          formatter(props: any) {
            return (
              <ModalButton
                style={modalButtonStyle}
                detail={props.row}
                id={props.row.id}
                type={'student'}
                editRowHandler={editRowHandler}
                deleteRowHandler={deleteRowHandler}
                sponsorArr={apis[1].data}
              />
            );
          },
        },
        { key: "name", name: "Name" },
        { key: "contactNo", name: "Contact No" },
        { key: "email", name: "Email" },
        { key: "university", name: "Univeristy" },
        { key: "course", name: "Course of Study" },
        {
          key: "startDate",
          name: "Course Start Date",
          formatter(props: any) {
            return props && props.row && props.row.startDate
              ? props.row.startDate.split("T")[0]
              : "";
          },
        },
        {
          key: "endDate",
          name: "Course End Date",
          formatter(props: any) {
            return props && props.row && props.row.endDate
              ? props.row.endDate.split("T")[0]
              : "";
          },
        },
        { key: "schoolEndDate", name: "Schol. start Date" },
        { key: "sponsor", name: "Sponsor Name" },
        { key: "files", name: "files" },
      ],
    },
    sponsor: {
      columns: [
        {
          key: "id",
          name: "ID",
          width: 10,
          formatter(props: any) {
            return (
              <ModalButton
                style={modalButtonStyle}
                detail={props.row}
                id={props.row.id}
                type={'sponsor'}
                editRowHandler={editRowHandler}
                deleteRowHandler={deleteRowHandler}
                sponsorArr={apis[1].data}
              />
            );
          },
        },
        { key: "name", name: "Name" },
        { key: "contactNo", name: "Contact No" },
        { key: "email", name: "Email" },
        { key: "files", name: "files" },
      ],
    },
  };

  const addNewHandler = (row: any) => {
    axios
      .post(WS_URL, {
        ...row,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const editRowHandler = (row: any) => {
    axios
      .patch(`${WS_URL}?id=${row.id}`, {
        ...row,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const deleteRowHandler = (row: any) => {
    axios
      .delete(`${WS_URL}?id=${row.id}`, {})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleExcelDownload = () => {
    const data = apis && apis[0] && apis[0].data ? apis[0].data : [];
    for (let i = 0; i < data.length; i++) {
      if (typeof data[i] === "object" && data[i].files) {
        data[i].files = data[i].files.toString();
      }
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, props.type);
    XLSX.writeFile(workbook, props.type + "-" + Date.now() + ".xlsx");
  };

  const downloadAllFiles = async () => {
    await downloadBlobArrayToZip(BUCKET_NAME, type);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <ModalButton
          detail={props.type === "student" ? studentEmptyRow : sponsorEmptyRow}
          id={`Add New ${props.type}`}
          type={props.type}
          isAddNew={true}
          addNewHandler={addNewHandler}
          sponsorArr={apis[1].data}
        />
        <Button
          style={{ margin: "10px" }}
          variant="success"
          onClick={handleExcelDownload}
        >
          <FaFileExcel />
        </Button>
        <Button
          variant="warning"
          onClick={downloadAllFiles}
        >
          <FaFileDownload />
        </Button>
      </div>
      <DataTableComponent
        columns={
          props.type === "student"
            ? columnData.student.columns
            : columnData.sponsor.columns
        }
        rows={apis && apis[0] && apis[0].data ? apis[0].data : []}
        type={type}
      />
    </>
  );
}
