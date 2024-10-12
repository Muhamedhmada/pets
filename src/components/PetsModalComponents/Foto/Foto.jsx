import { useRef, useState } from 'react';
import noPets from '../../../assets/images/noPets (1).png';
import pet from '../../../assets/images/with_pet_2.jpg';
import './style.css';
import { FaAnglesLeft } from 'react-icons/fa6';


export default function Foto({setValue , setSelectedTab , newPit , setNewPet}) {
  const fileInputRef = useRef(null);
  const [img , setImg] = useState("");
  

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    const file = event.target.files[0];
    setNewPet({...newPit , pet_img:file});
    setImg(imageUrl);
  };



  return (
  <>
      <div className='foto_page'>
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

<button className="btn" onClick={() => setSelectedTab("3")}>
<FaAnglesLeft />
  <span>Atras</span>
</button>
  </>
  )
}
