import {useState} from "react";
import "./style.css";
import CustomInput from "../../CustomInput/CustomInput";
import {FaAnglesLeft, FaAnglesRight} from "react-icons/fa6";
import Select  from "react-select";

export default function Salud({newPit , setNewPet , setNewsetValue, setSelectedTab}) {
  const [veterinarian, setVeterinarian] = useState("no");
  const [vacunación, setVacunación] = useState("no");
  const [tripleVacunación, setTripleVacunación] = useState("no");
  const [alergia, setAlergia] = useState("no");
  const [alguna, setAlguna] = useState("no");

    const yesNoOptions = [
        {
            label:"Si",
            value:1,
        },
        {
            label:"No",
            value:0,
        },
    ]


  return (
    <div>
      <div className='dom_third_grid'>
        <div className='input_group'>
          <label>
          ¿La mascota está castrada? <span> (*)</span>
          </label>
          <Select
            value={newPit.esta_cast}
            onChange={(e) => {
                setNewPet({...newPit ,  esta_cast:e.value})
            }}
            defaultValue='Amazonas'
            options={yesNoOptions}
          />
        </div>
        <div className='input_group'>
          <label>
          ¿Visita periodicamente al veterinario? <span> (*)</span>
          </label>
          <Select
            value={newPit.visit_per}
            onChange={(e) => {
                setNewPet({...newPit ,  visit_per:e.value})
            }}
            defaultValue='Amazonas'
            options={yesNoOptions}
          />
        </div>
        <div className='input_group'>
          <label>
          ¿Cuenta con vacunación séxtuple? <span> (*)</span>
          </label>
          <Select
            value={newPit?.cuenta_con_vac_sext}
            onChange={(e) => {
                setNewPet({...newPit ,  cuenta_con_vac_sext:e.value})
            }}
            options={yesNoOptions}
          />
        </div>
        <div className='input_group'>
          <label>
          ¿Cuenta con vacunación triple felina?<span> (*)</span>
          </label>
          <Select
            value={newPit?.cuenta_con_vac_trip_fel}
            onChange={(e) => {
                setNewPet({...newPit ,  cuenta_con_vac_trip_fel:e.value})
            }}
            options={yesNoOptions}
          />
        </div>
        <div className='input_group'>
          <label>
          ¿Cuenta con limpieza dental?<span> (*)</span>
          </label>
          <Select
            value={newPit?.cuenta_con}
            onChange={(e) => {
                setNewPet({...newPit ,  cuenta_con:e.value})
            }}
            options={yesNoOptions}
          />
        </div>
       <div className="input_group">
       <CustomInput
          label='Fecha de última desparacitación'
          required
          value={newPit.fecha_de_date}
          type={"date"}
          placeholder='Fecha de última desparacitación'
          onChange={(e) => setNewPet({...newPit, fecha_de_date: e.target.value})}
        />
       </div>
       <div className="input_group">
       <CustomInput
          label='¿Posee alguna alergia?'
          required
          value={newPit.posee_alg_alerg}
          placeholder='¿Posee alguna alergia?'
          onChange={(e) => setNewPet({...newPit, posee_alg_alerg: e.target.value})}
        />
       </div>
       <div className="input_group">
       <CustomInput
          label='¿Posee alguna enfermedad?'
          required
          value={newPit.posee_alg_enf}
          placeholder='¿Posee alguna enfermedad?'
          onChange={(e) => setNewPet({...newPit, posee_alg_enf: e.target.value})}
        />
       </div>
      </div>

      <div className='btns'>
        <button
          className='btn'
          onClick={() => {
            setSelectedTab("3");
          }}
        >
          <FaAnglesLeft />
          <span>Atras</span>
        </button>
        <button
          className='btn'
          onClick={() => {
            setSelectedTab("4");
          }}
        >
          <FaAnglesRight />
          <span>Siguiente</span>
        </button>
      </div>
    </div>
  );
}
