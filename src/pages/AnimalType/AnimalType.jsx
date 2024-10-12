import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import "./style.css";
import {FaFolderPlus, FaPencil} from "react-icons/fa6";
import TableComponent from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import {useEffect, useState} from "react";
import axios from "axios";
import {base_url, img_base_url} from "../../constant";
import {notify} from "../../assets/notification/notification";
import {ToastContainer} from "react-toastify";
import {Loader} from "rsuite";

export default function AnimalType() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_es: "",
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
        name_en: item.name_en,
        name_es: item.name_es,
      });
    } else {
      setEditMode(false);
      setFormData({
        name_en: "",
        name_es: "",
      });
    }
    setIsOpenModal(true);
  };

  // Function to confirm status update
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
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getAllData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        img_base_url + `animal_types/get_all_for_admin`
      );
      if (res.status === 200 && Array.isArray(res.data.result)) {
        setData(res.data.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${img_base_url}animal_types/update_status/${currentId}`
      );
      if (res.status === 200) {
        notify("Estado del Tipo de animal actualizado exitosamente", "success");
        getAllData();
      }
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
      handleConfirmCloseModal();
    }
  };

  // Create a new animal type
  const createDataTypeAnimal = async () => {
    try {
      const res = await axios.post(
        img_base_url + `animal_types/add_new`,
        formData,
        {headers: {lang: "es"}}
      );
      notify("Tipo de animal agregado exitosamente", "success");
      getAllData();
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  // Update an existing animal type
  const updateDataTypeAnimal = async () => {
    try {
      const res = await axios.post(
        img_base_url + `animal_types/update_one/${currentId}`,
        formData,
        {headers: {lang: "es"}}
      );
      notify("Tipo de animal actualizado con éxito", "success");
      getAllData(); // Reload data after update
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  // Handle server error responses
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

  // Submit form for create or update
  const handleSubmitCalificationForm = (e) => {
    e.preventDefault();
    if (formData.name_en === "" || formData.name_es === "") {
      notify("Se requieren títulos en inglés y español.", "error");
      return;
    }
    if (editMode) {
      updateDataTypeAnimal();
    } else {
      createDataTypeAnimal();
    }
    setIsOpenModal(false);
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <ToastContainer />
      <Modal
        title={editMode ? "Editar Tipo de animal" : "Agregar Tipo de animal"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size='900px'
        confirmButton={{
          onClick: handleSubmitCalificationForm,
          children: editMode ? "Actualizar" : "Agregar",
          style: {backgroundColor: "#36b9cc"},
        }}
        cancelButton={{
          onClick: handleCloseModal,
          children: "Cerca",
          style: {backgroundColor: "#858796"},
        }}
      >
        <form
          className='modal_form_calification'
          onSubmit={handleSubmitCalificationForm}
        >
          <CustomInput
            label='Tipo de animal (EN)'
            name='name_en'
            placeholder='Escriba el English de la Tipo de animal...'
            onChange={handleInputChange}
            value={formData.name_en}
          />
          <CustomInput
            label='Tipo de animal (ES)'
            name='name_es'
            placeholder='Escriba el Espanol de la Tipo de animal...'
            onChange={handleInputChange}
            value={formData.name_es}
          />
        </form>
      </Modal>

      {/* Confirmation modal for status update */}
      <Modal
        title={"confirmar estado de actualización"}
        show={confirmButton}
        onClose={handleConfirmCloseModal}
        showCloseBtn={true}
        size='900px'
        confirmButton={{
          onClick: updateStatus,
          children: "Actualizar",
          style: {backgroundColor: "#36b9cc"},
        }}
        cancelButton={{
          onClick: handleConfirmCloseModal,
          children: "Cerca",
          style: {backgroundColor: "#858796"},
        }}
      >
        {loading ? <Loader /> : <h1 className=''>Estás seguro de eso?</h1>}
      </Modal>

      <div className='race_page'>
        <FormCard header='Tipo de animal'>
          <div className='mt-4 d-flex align-items-center gap-4'>
            <CustomButton
              textColor='#333'
              onClick={() => handleOpenModal()}
              text='Agregar'
              icon={<FaFolderPlus />}
              color='#222'
              bgColor='#fff'
            />
          </div>
        </FormCard>
      </div>

      <div className='race_table'>
        {loading ? (
          <Loader />
        ) : (
          <TableComponent header={headers}>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name_en}</td>
                <td>{item.name_es}</td>
                <td>{item.hidden === 1 ? "Shown" : "Hidden"}</td>
                <td>
                  <div className='edit_btns justify-content-center'>
                    <button
                      onClick={() => handleConfirmModal(item.id)}
                      className='update_status_benefit'
                    >
                      Actualizar
                    </button>
                    <button
                      className='edited_button'
                      onClick={() => handleOpenModal(item)}
                    >
                      <FaPencil />
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
