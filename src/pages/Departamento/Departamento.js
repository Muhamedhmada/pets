import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import "./Departamento.css";
import { FaFile, FaSearch } from "react-icons/fa";
import TableComponent from "../../components/Table/Table";
import { race } from "../../utils/race";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import FromGroup from "./../../components/FromGroup/FromGroup";
import CustomSelect from "./../../components/CustomSelect/CustomSelect";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { base_url } from "../../constant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { arrowRight } from "../../assets/svgIcons";
import { useNavigate } from "react-router-dom";
export default function Departamento() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const headers = ["DEPARTAMENTO", "Estado", "Acciones"];
  const [isSearch, setIsSearch] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [rowData, setRowData] = useState({});
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [edit, setEdit] = useState(false);

  
  // Hmada
  const [data, setData] = useState([]);
  const [especeiData, setEspeceiData] = useState([]);
  const [nombreValue, setNombreValue] = useState("");
  const [description, setDescription] = useState("");
  const [updatedId, setUpdatedId] = useState("");
  const [departInputValue, setDepartInputValue] = useState("");
  const [espSelection, setEspSelection] = useState("");
  const [espInputValue, setEspInputValue] = useState("");
  const [language, setLanguage] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  function handleOpenModal(item = null) {
    if (item) {
      setEdit(true);
      setUpdatedId(item.id);
      setNombreValue(item.title_en);
      setDescription(item.title_es);
    } else {
      setEdit(false);
      setNombreValue("");
      setDescription("");
    }
    setIsOpenModal(true);
  }
  function handleCloseModal() {
    setIsOpenModal(false);
    setIsSubmitForm(false);
    setShowUpdateStatus(false);
    setUpdatedId(null);
    setNombreValue("");
    setDescription("");
  }

  function handleSubmitRaceForm(e) {
    e.preventDefault();

    if (edit) {
      handleDepartEditBtn();
    } else {
      createDataDepart();
    }

    setIsSearch(false);
    setIsOpenModal(false);
  }

  // to get all data in table
  const get_all_data = async () => {
    try {
      const res = await axios.get(`${base_url}get_all_departmento_for_admin`);
      console.log(res.data.Departments);

      if (res.status === 200 && Array.isArray(res.data.Departments)) {
        setData(res.data.Departments);
        setFilteredData(res.data.Departments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // set data for esp input in form
  const [espFormSelection, setEspFormSelection] = useState([]);
  const getAllEspSelection = async () => {
    try {
      const res = await axios.get(`${base_url}get_all_especie_for_admin`);
      console.log(res.data);

      if (res.status === 200 && Array.isArray(res.data)) {
        setEspFormSelection(res.data);
        setEspSelection(
          res?.data?.map((item) => ({
            value: item.id,
            label: language === "en" ? item.title_en : item.title_es,
          }))
        );
        console.log(setEspSelection);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const espFormData = espFormSelection.map((item) => {
    let textContent;
    if (language === "en") {
      textContent = item.title_en;
    } else {
      textContent = item.title_es;
    }
    return <option>{textContent}</option>;
  });

  // to get all option in especeiData
  const get_all_EspeceiData = () => {
    axios
      .get(base_url + "get_all_especie_for_admin")
      .then((res) => {
        console.log(res.data);
        if (res.status === 200 && Array.isArray(res.data)) {
          setEspeceiData(res.data);
          console.log(especeiData);
        }
      })
      .catch((error) => console.log(error));
  };

  // to handle change in nombreInput
  const handleNombreChange = (e) => {
    console.log(e.target.value);
    setNombreValue(e.target.value);
  };

  const postedData = {
    especie_id: 1,
    title_en: nombreValue,
    title_es: description,
  };

  // to post data into departamenot
  const createDataDepart = async () => {
    setIsDisabled(true);
    if (postedData.title_en !== "" && postedData.title_es !== "") {
      try {
        axios.post(base_url + "create_departmento", postedData).then((res) => {
          console.log(res.data.message);
          notify(res.data.message);
          setIsDisabled(false);
          get_all_data();
        });
      } catch (error) {
        console.log(error);
        setIsDisabled(false);
      }
    }
  };

  // to post the data

  const handleDepartEditBtn = async () => {
    setIsDisabled(true);
    const updatedData = {
      title_en: nombreValue,
      title_es: description,
    };

    try {
      const res = await axios.post(
        `${base_url}update_departmento/${updatedId}`,
        updatedData
      );
      notify(res.data.message);
      get_all_data();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabled(false);
    }
  };

  // to delete the data
  const handleDepartDeleteBtn = async (e) => {
    setIsDisabled(true);

    try {
      const res = await axios.post(`${base_url}delete_departmento/${e}`);
      notify(res.data.message);
      get_all_data();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabled(false);
    }
  };

  //   to update the status
  const notify = (m) => toast(m);
  const handleDepartUpdateBtn = async () => {
    setLoader(true);
    setIsDisabled(true);

    try {
      const res = await axios.get(
        `${base_url}update_departmento_status/${updatedId}`
      );
      console.log(res.data.message);
      notify(res.data.message);
      setShowUpdateStatus(false);
      get_all_data();
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
      setIsDisabled(false);
    }
  };

  // handle search
  useEffect(() => {
    if (espInputValue !== "" || departInputValue !== "") {
      // to filter by depart only
      let newData = [];
      if (espInputValue === "") {
        console.log("if esp is empty");
        newData = data.filter((obj) =>
          obj.title_en
            .toLowerCase()
            .includes(departInputValue.toLocaleLowerCase())
        );
      }
      // to filter by esp only
      else if (departInputValue === "") {
        console.log("if dep is empty");
        newData = data.filter((obj) =>
          obj.title_es.toLowerCase().includes(espInputValue.toLocaleLowerCase())
        );
      }
      // to filter by depart and esp
      else {
        console.log("tow input are filled");
        newData = data.filter(
          (obj) =>
            obj.title_es
              .toLowerCase()
              .includes(espInputValue.toLocaleLowerCase()) &&
            obj.title_en
              .toLowerCase()
              .includes(departInputValue.toLocaleLowerCase())
        );
      }
      setFilteredData(newData);
      console.log("end");
    } else {
      setFilteredData(data);
    }
  }, [espInputValue, departInputValue, data]);

  useEffect(() => {
    get_all_data();
    get_all_EspeceiData();
    getAllEspSelection();
  }, []);

  useEffect(() => {
    if (edit && rowData) {
      setNombreValue(rowData.title_en);
      setDescription(rowData.title_es);
    }
  }, [edit, rowData]);

  const navigate = useNavigate();

  return (
    <>
      <ToastContainer />
      <Modal
        title={edit ? "Registrar Title" : "Editar Title"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: handleSubmitRaceForm,
          children: " Guardar",
          style: { backgroundColor: "#36b9cc" },
        }}
        cancelButton={{
          onClick: handleCloseModal,
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        <form className="modal_form">
          <div className="modal_input_group">
            <lable>Especie</lable>
            <select
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            >
              {espFormData}
            </select>
          </div>
          <CustomInput
            label={edit ? "Departamento" : "Nombre"}
            placeholder="Escriba el nombre de la departamento..."
            onChange={handleNombreChange}
            value={nombreValue}
          />
        </form>
      </Modal>
      <Modal
        title="Registrar Title"
        show={showUpdateStatus}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: (item) => handleDepartUpdateBtn(item),
          children: " Guardar",
          style: { backgroundColor: "#36b9cc" },
          props: { disabled: isDisabled },
        }}
        cancelButton={{
          //   no errors here
          onClick: handleCloseModal,
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        {/* loadin  */}
        {loader ? (
          <Flex align="center" className="loader" gap="middle">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 48,
                  }}
                  spin
                />
              }
            />
          </Flex>
        ) : null}
        <h1>¿Estás seguro de ocultar este elemento?</h1>
      </Modal>
      <div className="depart_page">
        <FormCard header="Especies y Departamento">
          <FromGroup>
           
            <CustomInput
              label={"Descripción"}
              placeholder="departamento"
              onChange={(e) => setDepartInputValue(e.target.value)}
            />
          </FromGroup>

          <div className="mt-4 d-flex align-items-center gap-4">
            <CustomButton
              text="Buscar"
              icon={<FaSearch />}
              onClick={() => {
                setIsSearch(true);
                // handleSearchBtn();
              }}
              bgColor="#5bc0de"
            />
            <CustomButton
              textColor="#333"
              onClick={handleOpenModal}
              text="Nuevo"
              icon={<FaFile />}
              color={"#222"}
              bgColor="#fff"
            />
          </div>
        </FormCard>
      </div>
      <div className="depart_table">
        {/* data is an array that contain all data */}
        <TableComponent header={headers}>
          {filteredData.map((item) => (
            <tr>
              <td>{language === "en" ? item.title_en : item.title_en}</td>
              <td>
                {item.hidden == 1 ? (
                  <span className=" text-danger fw-bolder">Hidden</span>
                ) : (
                  <span className={" text-success fw-bolder"}>Active</span>
                )}
              </td>
              <td>
                <div className="d-flex gap-3 justify-content-center align-items-center">
                  <button
                    className="btn btn-primary text-light btn-sm"
                    onClick={() => handleOpenModal(item)}
                    disabled={isDisabled}
                  >
                    <FaPencil />
                  </button>
                  <button
                    className="btn btn-danger text-light btn-sm"
                    onClick={() => handleDepartDeleteBtn(item.id)}
                  >
                    <FaRegTrashCan />
                  </button>

                  <button
                    className="btn btn-success m-0 btn-sm"
                    onClick={() => {
                      // to open the confirm form
                      setShowUpdateStatus(true);
                      // to save the datea
                      setRowData(item);
                      // setUpdatedId(e)
                      setUpdatedId(item.id);
                    }}
                  >
                    actualizar
                  </button>
                  <button
                    onClick={() => navigate(`/provincia/${item?.id}`)}
                    className=" btn btn-primary m-0 btn-sm "
                  >
                    Provincia
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </TableComponent>
      </div>
          
    </>
  );
}
