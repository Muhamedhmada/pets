import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import "./style.css";
import { FaFolderPlus, FaPencil } from "react-icons/fa6";
import TableComponent from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../constant";
import { notify } from "../../assets/notification/notification";
import { ToastContainer } from "react-toastify";

import { Link, useParams } from "react-router-dom";
import { arrowLeft } from "../../assets/svgIcons";
import { Loader } from "rsuite";
import useGetDepProvencia from "../../CustomHooks/useGetDepProvencia";

export default function Provincia() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title_en: "",
    title_es: "",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [confirmButton, setConfirmButton] = useState(false);

  const headers = ["Título en inglés", "Título español", "Estado", "Acciones"];

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditMode(true);
      setCurrentId(item.id);
      setFormData({
        title_en: item.title_en,
        title_es: item.title_es,
      });
    } else {
      setEditMode(false);
      setFormData({
        title_en: "",
        title_es: "",
      });
    }
    setIsOpenModal(true);
  };

  const handleConfirmModal = (id) => {
    setConfirmButton(true);
    setCurrentId(id);
  };

  const handleConfirmCloseModal = () => {
    setConfirmButton(false);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setCurrentId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { dep_id } = useParams();


  const {handleGetDepProvs , depProv , setDepProv ,originalDepProv , setOriginalDepProv , loading:provLoading } = useGetDepProvencia()


  useEffect(()=>{
    handleGetDepProvs(dep_id)
  },[])


  const updateStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${base_url}update_provincia_status/${currentId}`
      );
      if (res.status === 200) {
        notify("Estado del Provincia actualizado exitosamente", "success");
        handleGetDepProvs(dep_id);
      }
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
      handleConfirmCloseModal();
    }
  };

  const createProvincia = async () => {
    try {
      const dataSend = {
        ...formData,
        departmento_id: dep_id,
      };
      const res = await axios.post(base_url + `create_provincia`, dataSend, {
        headers: { lang: "es" },
      });
      notify("Provincia agregado exitosamente", "success");
      handleGetDepProvs(dep_id);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const updateProvincia = async () => {
    try {
      const dataSend = {
        ...formData,
        departmento_id: dep_id,
      };
      const res = await axios.post(
        base_url + `update_provincia/${currentId}`,
        dataSend,
        { headers: { lang: "es" } }
      );
      notify("Provincia actualizado con éxito", "success");
      handleGetDepProvs(dep_id);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleErrorResponse = (error) => {
    if (
      error.response &&
      error.response.status === 422 &&
      error.response.data.errors
    ) {
      const errors = error.response.data.errors;
      Object.keys(errors).forEach((key) => {
        errors[key].forEach((message) => {
          notify(`${key}: ${message}`, "error");
        });
      });
    } else {
      notify(
        "A network or server error occurred. Please try again later.",
        "error"
      );
    }
  };

  const handleSubmitProvinciaForm = (e) => {
    e.preventDefault();
    if (formData.title_en === "" || formData.title_es === "") {
      notify("Se requieren títulos en inglés y español.", "error");
      return;
    }
    if (editMode) {
      updateProvincia();
    } else {
      createProvincia();
    }
    setIsOpenModal(false);
  };

  return (
    <>
      <ToastContainer />
      <Modal
        title={editMode ? "Editar Provincia" : "Agregar Provincia"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: handleSubmitProvinciaForm,
          children: editMode ? "Actualizar" : "Agregar",
          style: { backgroundColor: "#36b9cc" },
        }}
        cancelButton={{
          onClick: handleCloseModal,
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        <form
          className="modal_form_calification"
          onSubmit={handleSubmitProvinciaForm}
        >
          <CustomInput
            label="Provincia (EN)"
            name="title_en"
            placeholder="Escriba el English de la Provincia..."
            onChange={handleInputChange}
            value={formData.title_en}
          />
          <CustomInput
            label="Provincia (ES)"
            name="title_es"
            placeholder="Escriba el Espanol de la Provincia..."
            onChange={handleInputChange}
            value={formData.title_es}
          />
        </form>
      </Modal>

      <Modal
        title={"Confirmar estado de actualización"}
        show={confirmButton}
        onClose={handleConfirmCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: updateStatus,
          children: "Actualizar",
          style: { backgroundColor: "#36b9cc" },
        }}
        cancelButton={{
          onClick: handleConfirmCloseModal,
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <Loader  />
        ) : (
          <h1 className="">¿Estás seguro de eso?</h1>
        )}
      </Modal>

      <div className="race_page">
        <FormCard header="Provincia">
          <Link to={-1}>
            <button className="back_button ">{arrowLeft}</button>
          </Link>
          <div className="mt-4 d-flex align-items-center gap-4">
            <CustomButton
              textColor="#333"
              onClick={() => handleOpenModal()}
              text="Agregar"
              icon={<FaFolderPlus />}
              color="#222"
              bgColor="#fff"
            />
          </div>
        </FormCard>
      </div>

      <div className="race_table">
        {provLoading ? (
          <Loader  />
        ) : (
          <TableComponent header={headers}>
            {depProv.map((item) => (
              <tr key={item.id}>
                <td>{item.title_en}</td>
                <td>{item.title_es}</td>
                <td>
                  {item.hidden === 1 ? (
                    <span className="text-success fw-bolder">Active</span>
                  ) : (
                    <span className="text-danger fw-bolder">Hidden</span>
                  )}
                </td>
                <td>
                  <div className="edit_btns justify-content-center">
                    <button
                      className="edited_button text-light"
                      onClick={() => handleOpenModal(item)}
                    >
                      <FaPencil />
                    </button>
                    <button
                      onClick={() => handleConfirmModal(item.id)}
                      className="update_status_benefit"
                    >
                      Actualizar
                    </button>
                    <Link to={`/distrito/${item?.id}`} className="">
                      <button className="btn btn-primary btn-sm">
                        Distrito
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </TableComponent>
        )}
      </div>
    </>
  );
}
