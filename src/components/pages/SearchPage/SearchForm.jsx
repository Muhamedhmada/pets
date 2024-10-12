import React, { useEffect, useState } from "react";
import "./style.css";
import FormCard from "../../FormCard/FormCard";
import {
  SearchIconify,
  downloadIcon,
  filterIcon,
} from "../../../assets/svgIcons";
import FromGroup from "../../FromGroup/FromGroup";
import CustomButton from "../../CustomButton/CustomButton";
import CustomSelect from "../../CustomSelect/CustomSelect";
import axios from "axios";
import { base_url } from "../../../constant";

const petBirthdayOptions = [
  { label: "Seleccionar", value: "Seleccionar" },
  { label: "ENERO", value: "ENERO" },
  { label: "FEBRERO", value: "FEBRERO" },
  { label: "MARZO", value: "MARZO" },
  { label: "ABRIL", value: "ABRIL" },
  { label: "MAYO", value: "MAYO" },
  { label: "JUNIO", value: "JUNIO" },
  { label: "JULIO", value: "JULIO" },
  { label: "AGOSTO", value: "AGOSTO" },
  { label: "SETIEMBRE", value: "SETIEMBRE" },
  { label: "OCTUBRE", value: "OCTUBRE" },
  { label: "NOVIEMBRE", value: "NOVIEMBRE" },
  { label: "DICIEMBRE", value: "DICIEMBRE" },
];

const SearchForm = ({ isSubmitted, setIsSubmitted, handleDownload }) => {
  const [language, setLanguage] = useState('es');
  const [razaSelection , setRazaSelection] = useState([])

  useEffect(() => {
    const lang = document.documentElement.lang;
    setLanguage(lang);
  }, []);
  const [departamentoSelection, setDepartamentoSelection] = useState([]);
  const [provinciaSelection, setProvinciaSelection] = useState([]);
  const [distSelection, setDistSelection] = useState([])
  // to get DepartamentoInput value
  const [departamentoId, setDepartamentoId] = useState();
  const [proviId, setProviId] = useState();


  // to get all data in raza selection
  const getAllRazaSelection = () => {
    axios
      .get(base_url + `get_all_raza_for_admin`)
      .then((res) => {
        if (res.status === 200 && Array.isArray(res.data.Raza)) {
          console.log(res.data.Raza)
          setRazaSelection(
            res.data.Raza.map((item) => ({
              value: item.id,
              label: language ==="en"?item.title_en:item.title_es,
            }))
          );
        }
      })
      .catch((eror) => console.log(eror));
  };

  // to get all department selection
  const handleDepartamentoFocus = async () => {
    axios
      .get(base_url + `get_all_departmento_for_admin`)
      .then((res) => {
        if (res.status === 200) {
          if (Array.isArray(res.data.Departments)) {
            if (res.data.Departments.length !== 0) {
              setDepartamentoId(res.data.Departments[0].id);
              setDepartamentoSelection(
                res.data.Departments.map((item) => ({
                  value: item.id,
                  label: language === "en"?item.title_en:item.title_es,
                }))
              );
            }
          }
        }
      })
      .catch((error) => console.log(error));
  };
  //


  // to get all provinica selection
  const getAllProvinciaSelection = () => {
    axios
      .get(base_url + `departmento_prov/${departamentoId}`)
      .then((res) => {
        if (res.status === 200) {
          setProvinciaSelection(
            res.data.map((item) => ({
              value: item.id,
              label: language==="en"?item.title_en:item.title_es
            }))
          );
        }
      })
      .catch((eror) => console.log(eror));
  };

  // to get all data for dist
  const getAllDistSelection = () => {
    console.log(proviId)
    axios
      .get(base_url + `prov_dis/${proviId}`)
      .then((res) => {
        if (res.status === 200) {
          setDistSelection(
            res.data.map((item) => ({
              value: item.id,
              label: language ==="en"?item.title_en:item.title_es,
            }))
          );
        }
      })
      .catch((eror) => console.log(eror));
  };
  // getAllDistSelection()

  

  useEffect(() => {
    getAllProvinciaSelection();
    console.log(departamentoId)
  }, [departamentoId]);

  useEffect(() => {
    handleDepartamentoFocus();
    getAllDistSelection()
    getAllRazaSelection()
  }, []);


  const espData = [
    { value: "1", label: "TODOS" },
    { value: "2", label: "AVE" },
    { value: "3", label: "CANINO" },
    { value: "4", label: "FELINO" },
    { value: "5", label: "LAGOMORFO" },
    { value: "6", label: "MARZUPIAL" },
    { value: "7", label: "ROEDOR" },
  ];

  return (
    <div className="search_form">
      <FormCard
        drawer={true}
        icon={filterIcon}
        header={"Filtros de Búsqueda"}
        children={
          <>

            <FromGroup
              Buttons={
                <>
                  <CustomButton
                    onClick={() => setIsSubmitted(true)}
                    text={"Buscar"}
                    bgColor={"#4e73df"}
                    icon={SearchIconify}
                  />
                  <CustomButton
                    text={"Explortar"}
                    icon={downloadIcon}
                    bgColor={"#5cb85c"}
                    onClick={handleDownload}
                  />
                </>
              }
            >
              {/* first row */}
              <FromGroup.Input label={"DNI mascota / Correo propietario"} />
              <FromGroup.Input label={"Nombre mascota / propietario"} />
              <CustomSelect
                label={"Sexo"}
                data={[
                  { label: "Seleccionar", value: "1" },
                  { label: "Macho", value: "1" },
                  { label: "Hembra", value: "1" },
                ]}
                onChange={(e) => console.log(e)}
              />
              {/* second row */}
              <CustomSelect
                data={espData}
                onChange={(e) => console.log(e)}
                required={true}
                label={"Especie"}
              />
              <CustomSelect 
                required={true} 
                label={"Raza"}
                data={razaSelection} 
              />
              <CustomSelect
                label="Mes cumpleaños mascota"
                data={petBirthdayOptions}
              />
              {/* third row */}
              <CustomSelect
                label={"Departamento"}
                data={departamentoSelection}
                onChange={(e) => setDepartamentoId(e.value)}
                required={true}
              />
              <CustomSelect
                label={"Provincia"}
                data={provinciaSelection}
                onChange={(e) => setProviId( e.value)}
              />
              <CustomSelect 
                label={"Distrito"} 
                data = {distSelection}
                onChange={(e) => console.log(e.value)}
              
              />
              {/* 4th row */}
              <FromGroup.Input type="date" label={"Departamento"} />
              <FromGroup.Input type="date" label={"Provincia"} />
            </FromGroup>

          </>
        }
      />
    </div>
  );
};

export default SearchForm;
