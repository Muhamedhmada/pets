import "./style.css";

import TableComponent from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../constant";
import { notify } from "./../../assets/notification/notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PeopleFindPets() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animal, setAnimal] = useState(null);

  const headers = ["Nombres", "Apellidos", "Num One", "Num Two", ""];

  const handleOpenModal = (item) => {
    setIsOpenModal(true);
    setAnimal(item);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setAnimal(null);
  };

  const get_all_data = async () => {
    setLoading(true);
    try {
      const res = await axios.get(base_url + "all_findded_pets");
      if (res.status === 200 && Array.isArray(res.data.data)) {
        setData(res.data.data);
      } else {
        notify("Error fetching data!", "error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      notify("Network error while fetching data!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_all_data();
  }, []);

  return (
    <>
      (
      <Modal
        title={"More Info For Animal"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        cancelButton={{
          onClick: handleCloseModal,
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        <div className="modal_content__">
          <div className="modal_info_section">
            <h3 className="title_animal">{`${animal?.nombres} ${animal?.Apellidos}`}</h3>

            <p className="info_animal">
              <strong>Departmento:</strong>{" "}
              {animal?.departmento?.title_en || "N/A"}
            </p>
            <p className="info_animal">
              <strong>Distrito:</strong> {animal?.distrito?.title_es || "N/A"}
            </p>
            <p className="info_animal">
              <strong>Provincia:</strong> {animal?.provincia?.title_es || "N/A"}
            </p>
            <p className="info_animal">
              <strong>Fecha De Nacimiento:</strong>{" "}
              {animal?.fecha_de_nac || "N/A"}
            </p>
            <p className="info_animal">
              <strong>Color De Mascota:</strong> {animal?.animal_color || "N/A"}
            </p>
          </div>
        </div>
      </Modal>
      )
      <div className="race_table">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <TableComponent header={headers}>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.nombres}</td>
                <td>{item.Apellidos}</td>
                <td>{item.num_one}</td>
                <td>{item.num_two}</td>
                <td>
                  <div>
                    <button
                      className="more_info_for_animal justify-content-center"
                      onClick={() => handleOpenModal(item)}
                    >
                      Más información
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </TableComponent>
        )}
      </div>
      {/* Toast notifications */}
      <ToastContainer />
    </>
  );
}
