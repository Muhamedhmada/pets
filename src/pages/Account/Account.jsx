import { useRef, useState } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import './style.css';
import noPets from '../../assets/images/noPets (1).png';

export default function Account() {
   const fileInputRef = useRef(null);
   const [img , setImg] = useState("");
   
 
   const handleButtonClick = () => {
     fileInputRef.current.click();
   };
 
   const handleFileChange = (event) => {
     const file = URL.createObjectURL(event.target.files[0]);
     setImg(file);
   };

   
  return (
    <div className="account_card">
       <div className="account_card_header">
          <h4>MI CUENTA</h4>
       </div>

       <div className="account_card_body">
          <div className='custom_form'>
            <div className='inputs_group'>
                <div>
                  <label>Nombres <span>(*)</span></label>
                  <input placeholder='Big Bang'/>
                </div>

                <div>
                  <label>Apellidos <span>(*)</span></label>
                  <input placeholder='Company'/>
                </div>


                <div>
                  <label>Sexo <span>(*)</span></label>
                  <select>
                     <option value="Seleccionar">Seleccionar</option>
                     <option value="Masculino">Masculino</option>
                     <option value="Femenino">Femenino</option>
                  </select>
                </div>
            </div>

            <div className='inputs_group'>
               <div>
                  <label>Fecha de Nacimiento <span>(*)</span></label>
                  <input type='date' />
               </div>

               <div>
                  <label>Telefono</label>
                  <input type='tel' placeholder='Escriba el telefono...' />
               </div>

               <div>
                  <label>Celular</label>
                  <input type='tel' placeholder='Escriba el celular...'/>
               </div>
            </div>

            <div className='foto_page' style={{transform:"translateX(50%)"}}>
        <div>
            <img src={img == "" ? noPets : img}/>
        </div>
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
       <button onClick={handleButtonClick}>
        Subir
      </button>
    </div>

            <button style={{width:"fit-content" , backgroundColor:"#36b9cc", color:"white" , padding:"7px",borderRadius:'5px'}}>ACTUALIZAR MIS DATOS</button>
          </div>
       </div>
    </div>
  )
}


