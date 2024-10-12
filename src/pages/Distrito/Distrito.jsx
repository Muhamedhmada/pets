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
import useGetProvDis from "../../CustomHooks/useGetProvDis";
import { Loader } from "rsuite";

export default function Distrito() {
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

  const { prov_id } = useParams();

  const {
    handleGetProvDis,
    provDis,
    loading: disLoading,
  } = useGetProvDis(prov_id);

  const updateStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${base_url}update_distrito_status/${currentId}`
      );
      if (res.status === 200) {
        notify("Estado del Distrito actualizado exitosamente", "success");
        handleGetProvDis(prov_id);
      }
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
      handleConfirmCloseModal();
    }
  };

  const createDistrito = async () => {
    try {
      const dataSend = {
        ...formData,
        provincia_id: prov_id,
      };
      const res = await axios.post(base_url + `create_distrito`, dataSend, {
        headers: { lang: "es" },
      });
      notify("Distrito agregado exitosamente", "success");
      handleGetProvDis(prov_id);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const updateDistrito = async () => {
    try {
      const dataSend = {
        ...formData,
        provincia_id: prov_id,
      };
      const res = await axios.post(
        base_url + `update_distrito/${currentId}`,
        dataSend,
        { headers: { lang: "es" } }
      );
      notify("Distrito actualizado con éxito", "success");
      handleGetProvDis(prov_id);
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

  const handleSubmitDistritoForm = (e) => {
    e.preventDefault();
    if (formData.title_en === "" || formData.title_es === "") {
      notify("Se requieren títulos en inglés y español.", "error");
      return;
    }
    if (editMode) {
      updateDistrito();
    } else {
      createDistrito();
    }
    setIsOpenModal(false);
  };

  useEffect(() => {
    handleGetProvDis(prov_id);
  }, []);

  return (
    <>
      <ToastContainer />
      <Modal
        title={editMode ? "Editar Distrito" : "Agregar Distrito"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: handleSubmitDistritoForm,
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
          onSubmit={handleSubmitDistritoForm}
        >
          <CustomInput
            label="Distrito (EN)"
            name="title_en"
            placeholder="Escriba el English del Distrito..."
            onChange={handleInputChange}
            value={formData.title_en}
          />
          <CustomInput
            label="Distrito (ES)"
            name="title_es"
            placeholder="Escriba el Español del Distrito..."
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
        <FormCard header="Distrito">
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
        {disLoading ? (
          <Loader />
        ) : (
          <TableComponent header={headers}>
            {provDis.map((item) => (
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
