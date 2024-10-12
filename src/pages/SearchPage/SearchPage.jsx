import * as XLSX from "xlsx";
import React, {useEffect, useState} from "react";
import SearchForm from "../../components/pages/SearchPage/SearchForm";
import "./style.css";
import Modal from "./../../components/Modal/Modal";
import TableComponent from "../../components/Table/Table";
import {searchData} from "../../utils/search";
import {Table} from "antd";

const SearchPage = () => {
  const headers = [
    "DNI",
    "MASCOTA",
    "ESPECIE",
    "DIRECCIÓN",
    "DISTRITO",
    "FECHA NACIMIENTO",
    "FECHA REGISTRO",
    "DUEÑO",
    "CORREO",
    "TELEFONO",
  ];
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    console.log(isSubmitted);
    console.log(searchData);
  }, [isSubmitted]);

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const sheetData = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(workbook, sheetData, "Sheet1");

    const wbBlob = new Blob(
      [XLSX.write(workbook, {bookType: "xlsx", type: "binary"})],
      {
        type: "application/octet-stream",
      }
    );

    const url = URL.createObjectURL(wbBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "empty.xlsx");
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  const columns = [
    {
      title: "DNI",
      dataIndex: "DNI",
      key: "dni",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "MASCOTA",
      dataIndex: "NOMBRE",
      key: "NOMBRE",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ESPECIE",
      dataIndex: "ESPECIE",
      key: "ESPECIE",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "DIRECCION",
      dataIndex: "DIRECCION",
      key: "DIRECCION",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "DIRECCION",
      dataIndex: "DIRECCION",
      key: "DIRECCION",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "DISTRITO",
      dataIndex: "DISTRITO",
      key: "DISTRITO",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "DISTRITO",
      dataIndex: "DISTRITO",
      key: "DISTRITO",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "NOMBRE_PRE",
      dataIndex: "NOMBRE_PRE",
      key: "NOMBRE_PRE",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "CORREO",
      dataIndex: "CORREO",
      key: "CORREO",
      render: (text) => <a>{text}</a>,
    },
  ];

  return (
    <div className='search_page'>
      <div className='search_container'>
        <SearchForm
          setIsSubmitted={setIsSubmitted}
          isSubmitted={isSubmitted}
          handleDownload={handleDownload}
        />
      </div>

      <div className='search_table_container'>
        <Table
          className='custom-header'
          
          columns={columns}
          dataSource={searchData}
        />

        {/* <TableComponent header={headers}>
            {isSubmitted && searchData.map(item => 
          <tr>
            <td>{item.DNI}</td>
            <td>{item.NOMBRE}</td>
            <td>{item.ESPECIE}</td>
            <td>{item.DIRECCION}</td>
            <td>{item.DISTRITO}</td>
            <td></td>
            <td></td>
            <td>{item.NOMBRE_PRE}</td>
            <td>{item.CORREO}</td>
            <td>{item.TELEFONO}</td>
           </tr>
          )}
         </TableComponent> */}
      </div>
    </div>
  );
};

export default SearchPage;
