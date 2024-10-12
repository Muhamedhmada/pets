import {FaSearch, FaUserPlus} from "react-icons/fa";
import "./style.css";
import {FaFile} from "react-icons/fa6";
import {useEffect, useState} from "react";
import Modal from "../../components/Modal/Modal";
import CustomInput from "../../components/CustomInput/CustomInput";
import Alert from "../../components/Alert/Alert";
import CustomInputWithSearch from "../../components/CustomInputWithSearch/CustomInputWithSearch";
import FormCard from "../../components/FormCard/FormCard";
import CustomButton from "./../../components/CustomButton/CustomButton";
import TableLayout from "./../../components/TableLayout/index";
import Datos from "../../components/PetsModalComponents/Datos/Datos";
import Domicilio from "../../components/PetsModalComponents/Domicilio/Domicilio";
import Salud from "../../components/PetsModalComponents/Salud/Salud";
import Foto from "../../components/PetsModalComponents/Foto/Foto";
import TableComponent from "../../components/Table/Table";
// import PetsModalComponents from "../../components/PetsModalComponents/PetsModalComponents";
import CustomSelect from "./../../components/CustomSelect/CustomSelect";
import useGetUsers from "../../CustomHooks/useGetUsers";
import {userPlus} from "../../assets/svgIcons";
import AddNewUserModal from "./AddNewUserModal";
import {toast} from "react-toastify";
import {Table} from "antd";
import {useMediaQuery} from "./../../CustomHooks/useMediaQueries";

const tabs = [
  {
    id: "1",
    name: "Datos",
  },
  {
    id: "2",
    name: "Domicilio",
  },
  {
    id: "3",
    name: "Salud",
  },
  {
    id: "4",
    name: "Foto",
  },
];

export default function Mascota() {
  const headers = [
    "OPCION",
    "FOTO",
    "DNI RUMP",
    "ESTADO",
    "NOMBRE",
    "SEXO",
    "TAMAÑO",
    "COLOR",
    "TIPO",
    "RAZA",
  ];

  const [addUserModal, setAddUserModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [alert, setAlert] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRegisteredModal, setIsRegisteredModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("1");

  const [newPit, setNewPet] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    f_name: "",
    l_name: "",
    sex: "",
    departmento_id: "",
    provincia_id: "",
    districto_id: "",
    micro: "",
    bio: "",
    type: "",
    raza: "",
    qualified: "",
    coat_color: "",
    dob: "",
    officials: "",
    resPersons: [{name: "", dni: "", phone: ""}],
    direccion: "",
    piso: "",
    referencia: "",
    mascota_tiene: "",
    esta_cast: "",
    visit_per: "",
    cuenta_con_vac_sext: "",
    cuenta_con_vac_trip_fel: "",
    cuenta_con: "",
    fecha_de_date: "",
    posee_alg_alerg: "",
    posee_alg_enf: "",
    pet_img: null,
  });

  useEffect(() => {
    console.log(newPit);
  }, [newPit]);

  const handleSelectPit = () => {
    if (newPit.userId) {
      setIsRegisteredModal(true);
      setIsModalOpen(false);
      return;
    }

    toast.error("Elige un usuario primero");
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    if (email === "") {
      setAlert("Correo: Ingrese un correo válido");
    } else {
      setAlert("");
      setIsRegisteredModal(true);
      setIsModalOpen(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setAlert("");
    setIsSubmitted(false);
  }

  function handleCloseRegisterModal() {
    setIsRegisteredModal(false);
  }

  const {handleGetUsers, users} = useGetUsers();

  useEffect(() => {
    handleGetUsers();
  }, []);

  const columns = [
    {
      title: "OPCION",
      dataIndex: "OPCION",
      key: "OPCION",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "FOTO",
      dataIndex: "FOTO",
      key: "FOTO",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "DNI RUMP",
      dataIndex: "DNI RUMP",
      key: "DNI RUMP",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ESTADO",
      dataIndex: "ESTADO",
      key: "ESTADO",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "NOMBRE",
      dataIndex: "NOMBRE",
      key: "NOMBRE",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "DIRECCION",
      dataIndex: "DIRECCION",
      key: "DIRECCION",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "SEXO",
      dataIndex: "SEXO",
      key: "SEXO",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "DISTRITO",
      dataIndex: "DISTRITO",
      key: "DISTRITO",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "TAMAÑO",
      dataIndex: "TAMAÑO",
      key: "TAMAÑO",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "COLOR",
      dataIndex: "COLOR",
      key: "COLOR",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "TIPO",
      dataIndex: "TIPO",
      key: "TIPO",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "RAZA",
      dataIndex: "RAZA",
      key: "RAZA",
      render: (text) => <a>{text}</a>,
    },
  ];

  const isSmallScreen = useMediaQuery("(max-width:786px)");

  return (
    <>
      <Modal
        title='Seleccionar propietario'
        size='1000px'
        style={{height: "600px", overflow: "auto"}}
        confirmButton={{
          children: "GUARDAR",
          style: {backgroundColor: "#36b9cc"},
        }}
        cancelButton={{
          children: "Cerrar",
          style: {backgroundColor: "#858796"},
        }}
        show={isRegisteredModal}
        onClose={handleCloseRegisterModal}
        showCloseBtn={true}
        animation={true}
      >
        <div className='modal_tabs'>
          {tabs?.map((tab, index) => {
            return (
              <div
                key={index}
                onClick={() => setSelectedTab(tab.id)}
                className={`modal_tab ${
                  selectedTab == tab?.id ? "active" : ""
                }`}
              >
                {tab?.name}
              </div>
            );
          })}
        </div>

        {selectedTab == 1 && (
          <Datos
            setNewPet={setNewPet}
            newPit={newPit}
            setSelectedTab={setSelectedTab}
          />
        )}
        {selectedTab == 2 && (
          <Domicilio
            setNewPet={setNewPet}
            newPit={newPit}
            setSelectedTab={setSelectedTab}
          />
        )}
        {selectedTab == 3 && (
          <Salud
            setNewPet={setNewPet}
            newPit={newPit}
            setSelectedTab={setSelectedTab}
          />
        )}
        {selectedTab == 4 && (
          <Foto
            setNewPet={setNewPet}
            newPit={newPit}
            setSelectedTab={setSelectedTab}
          />
        )}
        {/* <PetsModalComponents /> */}
      </Modal>

      {isModalOpen && (
        <Modal
          title='Seleccionar propietario'
          size='600px'
          confirmButton={{
            style: {backgroundColor: "#36b9cc"},
            onClick: handleSelectPit,
            props: {
              disabled: !newPit.userId,
              className: ` ${!newPit.userId ? "opacity-50" : ""} text-white`,
            },
            children: (
              <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                <FaUserPlus />
                <span>Seleccionar</span>
              </div>
            ),
          }}
          cancelButton={{
            style: {backgroundColor: "#858796"},
            onClick: handleCloseModal,
            children: <span>Cerrar</span>,
          }}
          show={isModalOpen}
          onClose={handleCloseModal}
          showCloseBtn={true}
          animation={true}
        >
          {isSubmitted && alert && <Alert bgColor='#fdf3d8' color='#806520' />}
          <form onSubmit={handleSubmit}>
            <CustomInput
              label='Correo:'
              placeholder='Ingrese el correo del propietario'
              onChange={(e) => setEmail(e.target.value)}
              type='email'
            />

            <CustomSelect
              onChange={(e) => setNewPet({...newPit, userId: e.value})}
              label={"Correo:"}
              placeholder='Ingrese el correo del propietario:'
              data={users.map((user) => ({label: user.name, value: user.id}))}
            />

            <CustomButton
              onClick={() => setAddUserModal(true)}
              className={"mt-3"}
              icon={userPlus}
              text={"Agregar nuevo usuario"}
            />
          </form>
        </Modal>
      )}

      <AddNewUserModal
        newPit={newPit}
        setNewPet={setNewPet}
        open={addUserModal}
        setOpen={setAddUserModal}
      />

      <FormCard
        drawer={true}
        header={"Mantenimiento de Mascota"}
        children={
          <>
            <form onSubmit={handleSearch}>
              <div style={{width: isSmallScreen ? "100%" : "40.33%"}}>
                <CustomInputWithSearch
                  placeholder='Ingrese DNI mascota...'
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
              </div>

              <div className='mt-3'>
                <CustomButton
                  onClick={handleOpenModal}
                  icon={<FaFile />}
                  text={"AGREGAR MASCOTA"}
                  bgColor={"#D1A535"}
                />
              </div>
            </form>
          </>
        }
      />

      <div className='search_table_container'>
        <Table
          className='custom-header'
          columns={columns}
          // dataSource={searchData}
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
      {/* 
      <div className='mascota_table'>
        <TableComponent header={headers} />












      </div> */}
    </>
  );
}
