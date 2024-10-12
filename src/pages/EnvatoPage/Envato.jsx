import React, {useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import {fileIcon} from "../../assets/svgIcons";
import "./style.css";
import FormCard from "./../../components/FormCard/FormCard";
import CustomSelect from "./../../components/CustomSelect/CustomSelect";
import {Alert, Form, InputGroup} from "react-bootstrap";
import Modal from "../../components/Modal/Modal";
import FromGroup from "../../components/FromGroup/FromGroup";

const Envato = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [addNewModal, setAddNewModal] = useState(false);

  return (
    <div className='Envato_contaienr'>
      {showAlert && (
        <div className='evento_alert'>
          <Alert
            variant='danger'
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>No se encontraron registros.</Alert.Heading>
          </Alert>
        </div>
      )}

      <FormCard
        header={"Evento de Mascota"}
        children={
          <>
            <div className='envato_inputs'>
              <div>
                <CustomSelect
                data={[{name:"TODOS"},{name:"ALIMENTO"},{name:"ANTIPULGAS"},{name:"ARENA"},{name:"ATENCIÓN MÉDICA"},{name:"BAÑO"},{name:"CAMA"},{name:'CONTROL MÉDICO'}]}
                  inRow={true}
                  label={"Tipo:"}
                  placeholder={"TODOS"}
                />
              </div>
              <div>
                <CustomSelect
                data={[{name:"TODOS"},{name:"Big Bang"},{name:"loly"}]}
                placeholder={"TODOS"}
                  inRow={true}
                  label={"Mascota:"}
                  // placeholder={"Escriba el DNI de la mascota..."}
                />
              </div>
            </div>
            <div className='envato_card_buttons'>
              <CustomButton
                onClick={() => setAddNewModal(true)}
                icon={fileIcon}
                bgColor={"#858796"}
                text={"Nuevo"}
              />
            </div>
          </>
        }
      />

      {/* Moda */}

      <Modal
        size={"90%"}
        show={addNewModal}
        showCloseBtn
        title={"Registrar Evento"}
        onClose={() => setAddNewModal(false)}
        children={
          <>
            <div>
              <FromGroup>
                {/* first row */}
                <CustomSelect required={true} label={"Pet"} />
                <CustomSelect required={true} label={"Mascota"} />
                <FromGroup.Input   label={"Escriba el titulo"} />
              </FromGroup>

              <div className='mt-3'>
                <CustomInput
                  label={"Detalle"}
                  placeholder={"Escriba una referencia del evento..."}
                  textarea={true}
                />
              </div>
              <div className='mt-3'>
                <FromGroup>
                  <FromGroup.Input label={"Escriba el titulo"} />
                  <div>
                    <label htmlFor=''>
                      hello label <span>(*)</span>{" "}
                    </label>
                    <InputGroup className='mb-3 flex-row gap-0'>
                      <Form.Control type='date' aria-label='First name' />
                      <Form.Control placeholder="HH:mm" tepe='date' aria-label='Last name' />
                    </InputGroup>
                  </div>
                </FromGroup>
              </div>
              <hr />

              <div className='modal_buttons'>
                <button className="confirm_button">GUARDAR</button>
                <button className="cancel_button" >Cerrar</button>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};

export default Envato;
