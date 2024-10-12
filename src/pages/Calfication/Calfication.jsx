import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import "./style.css";
import { FaFolderPlus, FaPencil, FaRegTrashCan } from "react-icons/fa6";
import TableComponent from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../constant";
import { notify } from "../../assets/notification/notification";
import { ToastContainer } from "react-toastify";

export default function Calfication() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title_en: "",
    title_es: "",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const headers = ["Título en inglés", "Título español", "Acciones"];

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

  const get_all_data = async () => {
    setLoading(true);
    try {
      const res = await axios.get(base_url+`calification/get_all`);
      if (res.status === 200 && Array.isArray(res.data.data)) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const createDataCalification = async () => {
    try {
      const res = await axios.post(
    base_url+`calification/create_one`,
        formData,
        {
          headers: { lang: "es" },
        }
      );
      console.log("Created data:", res.data);
      notify("Calcificación creada con éxito", "success");
      get_all_data();
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const updateDataCalification = async () => {
    try {
      const res = await axios.post(
        base_url+`calification/update_one/${currentId}`,
        formData,
        {
          headers: { lang: "es" },
        }
      );
      console.log("Updated data:", res.data);
      notify("Calcificación editada con éxito", "success");
      get_all_data();
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

  const handleSubmitCalificationForm = (e) => {
    e.preventDefault();

    if (formData.title_en === "" || formData.title_es === "") {
      notify("Se requieren títulos en inglés y español.", "error");
      return;
    }

    if (editMode) {
      updateDataCalification();
    } else {
      createDataCalification();
    }

    setIsOpenModal(false);
  };

  const handleCalificationDeleteBtn = async (id) => {
    try {
      const res = await axios.get(base_url+`calification/delete_one/${id}`);
      console.log(`Deleted item with ID: ${id}`, res.data);
      notify("Calificación eliminada con éxito", "success");
      get_all_data();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    get_all_data();
  }, []);

  return (
    <>
      {
        <Modal
          title={editMode ? "Editar calificación" : "Agregar calificación"}
          show={isOpenModal}
          onClose={handleCloseModal}
          showCloseBtn={true}
          size="900px"
          confirmButton={{
            onClick: handleSubmitCalificationForm,
            children: editMode ? "Actualizar" : "Agregar",
            style: { backgroundColor: "#36b9cc" },
          }}
          cancelButton={{
            onClick: handleCloseModal,
            children: "Cerca",
            style: { backgroundColor: "#858796" },
          }}
        >
          <form
            className="modal_form_calification"
            onSubmit={handleSubmitCalificationForm}
          >
            <CustomInput
              label="English"
              name="title_en"
              placeholder="Escriba el English de la calfication..."
              onChange={handleInputChange}
              value={formData.title_en}
            />
            <CustomInput
              label="Español"
              name="title_es"
              placeholder="Escriba el Espanol de la calfication..."
              onChange={handleInputChange}
              value={formData.title_es}
            />
          </form>
        </Modal>
      }

      <div className="race_page">
        <FormCard header="Species and Califications">
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TableComponent header={headers}>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.title_en}</td>
                <td>{item.title_es}</td>

                <td>
                  <div className="edit_btns justify-content-center">
                    <button onClick={() => handleOpenModal(item)}>
                      <FaPencil />
                    </button>
                    <button
                      onClick={() => handleCalificationDeleteBtn(item.id)}
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </TableComponent>
        )}
      </div>

      <ToastContainer />
    </>
  );
}