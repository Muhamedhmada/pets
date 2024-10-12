import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import { FaFolderPlus, FaPencil } from "react-icons/fa6";
import TableComponent from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { base_url, img_base_url } from "../../constant";
import { notify } from "../../assets/notification/notification";
import { ToastContainer } from "react-toastify";

export default function Benefits() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title_en: "",
    title_es: "",
    icon: null,
    description_es: "",
    description_en: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const headers = [
    "Ícono",
    "Título en Español",
    "Descripción en Español",
    "Descripción en Inglés",
    "Título en Inglés",
    "Estado",
    "Acciones",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOpenModal = (item) => {
    if (item) {
      setEditMode(true);
      setCurrentId(item.id);
      setFormData({
        title_en: item.title_en,
        title_es: item.title_es,
        icon: item.icon,
        description_es: item.description_es,
        description_en: item.description_en,
        status: item.status,
      });
    } else {
      setEditMode(false);
      setFormData({
        title_en: "",
        title_es: "",
        icon: null,
        description_es: "",
        description_en: "",
        status: "",
      });
    }
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setCurrentId(null);
  };

  const getAllData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(base_url + "benefits/get_all_for_admin");
      if (res.status === 200 && Array.isArray(res.data.data)) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const createBenefit = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("image", formData.icon);

      const imgRes = await axios.post(img_base_url + "img_upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          lang: "es",
        },
      });

      if (imgRes.data.status === "success") {
        const imageUrl = imgRes.data.result.image;

        console.log(imageUrl);
        const benefitData = {
          ...formData,
          icon: imageUrl,
        };

        const res = await axios.post(
          base_url + "benefits/add_new",
          benefitData,
          {
            headers: {
              lang: "es",
            },
          }
        );

        notify("Beneficio creado exitosamente", "success");
        getAllData();
      }
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const updateBenefit = async () => {
    setLoading(true);
    try {
      let iconUrl = formData.icon;

      if (formData.icon && formData.icon.name) {
        const formDataImage = new FormData();
        formDataImage.append("image", formData.icon);

        const { data: imgRes } = await axios.post(
          img_base_url + "img_upload",
          formDataImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              lang: "es",
            },
          }
        );

        iconUrl = imgRes.result.image;
      }

      const benefitData = {
        ...formData,
        icon: iconUrl,
      };

      await axios.post(
        base_url + `benefits/update_one/${currentId}`,
        benefitData,
        {
          headers: {
            lang: "es",
          },
        }
      );

      notify("Beneficio actualizado exitosamente", "success");
      getAllData();
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}benefits/update_status/${id}`);
      if (res.status === 200) {
        notify("Estado del beneficio actualizado exitosamente", "success");
        getAllData();
      }
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const handleErrorResponse = (error) => {
    if (error.response) {
      console.error("Error response:", error.response);
      if (error.response.status === 422 && error.response.data.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          errors[key].forEach((message) => {
            notify(`${key}: ${message}`, "error");
          });
        });
      }
    } else {
      console.error("Error updating data:", error);
      notify("Network or server error. Please try again later.", "error");
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsOpenModal(false);
    if (
      formData.icon === null ||
      formData.description_en === "" ||
      formData.description_es === "" ||
      formData.title_en === "" ||
      formData.title_es === ""
    ) {
      notify("Por favor completa la información", "error");
      return;
    }
    if (editMode) {
      await updateBenefit();
    } else {
      await createBenefit();
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <>
      <Modal
        title={editMode ? "Editar beneficio" : "Agregar beneficio"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: handleSubmitForm,
          children: editMode ? "Actualizar" : "Agregar",
          style: { backgroundColor: "#36b9cc" },
          props: {
            disabled: loading,
          },
        }}
        cancelButton={{
          onClick: handleCloseModal,
          children: "Close",
          style: { backgroundColor: "#858796" },
        }}
      >
        <form className="modal_form">
          <CustomInput
            label="Icon"
            name="icon"
            type="file"
            onChange={handleInputChange}
          />

          <CustomInput
            label="Descripción en español"
            name="description_es"
            placeholder="Ingrese la descripción en español..."
            onChange={handleInputChange}
            value={formData.description_es}
          />

          <CustomInput
            label="Título español"
            name="title_es"
            placeholder="Ingrese el título en español..."
            onChange={handleInputChange}
            value={formData.title_es}
          />

          <CustomInput
            label="Descripción en inglés"
            name="description_en"
            placeholder="Introduzca la descripción en inglés..."
            onChange={handleInputChange}
            value={formData.description_en}
          />

          <CustomInput
            label="Título en inglés"
            name="title_en"
            placeholder="Ingrese el título en inglés..."
            onChange={handleInputChange}
            value={formData.title_en}
          />
        </form>
      </Modal>
      <div className="race_page">
        <FormCard header="Benefits">
          <div className="mt-4 d-flex align-items-center gap-4">
            <CustomButton
              textColor="#333"
              onClick={() => handleOpenModal()}
              text="Agregar beneficio"
              icon={<FaFolderPlus />}
              color={"#222"}
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
                <td>
                  <img src={item.icon} alt="" />
                </td>
                <td>{item.title_es}</td>
                <td>{item.description_es}</td>
                <td>{item.description_en}</td>
                <td>{item.title_en}</td>
                <td>{item.hidden}</td>
                <td>
                  <div className="edit_btns justify-content-center">
                    <button
                      onClick={() => updateStatus(item.id)}
                      className={`update_status_benefit `}
                    >
                      Actualizar
                    </button>

                    <button onClick={() => handleOpenModal(item)}>
                      <FaPencil />
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
