import React, {useEffect, useState} from "react";
import "./style.css";
import Typo from "./../../../utils/Typo/Typo";
import DnDFile from "../../../utils/DnD_file/DnDFile";
import Jodit from "../../../utils/jodit/Jodit";
const AboutContent = ({aboutData, setAboutData, aboutUrl, setAboutUrl , resTxt , setResTxt , resTit , setResTit , resUrl , setResUrl}) => {
  const [aboutFile, setAboutFile] = useState(null);
  useEffect(() => {
    if (aboutFile) setAboutData({...aboutData, about_file: aboutFile});
  }, [aboutFile]);

  return (
    <div className='hone_banner'>
      <div className='d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          imagen
        </Typo>

        <DnDFile
          fileUrl={aboutUrl}
          setFileUrl={setAboutUrl}
          file={aboutUrl}
          setFile={setAboutUrl}
        />
      </div>
      <div className='d-flex flex-column  gap-3 '>
        <Typo variant={"lg"} fw={"bolder"}>
          Acerca del título de la sección
        </Typo>
        {
          <Jodit
            onChange={(e) => setAboutData({...aboutData, res_tit: e})}
            content={aboutData?.res_tit}
          />
        }
      </div>

      {/* hmada */}
      <div className='d-flex flex-column  gap-3 '>
        <Typo variant={"lg"} fw={"bolder"}>
          texto responsable
        </Typo>
        {
          <Jodit
            onChange={(e) => setResTxt({...resTxt, res_txt: e})}
            content={aboutData?.res_txt}
          />
        }
      </div>
      <div className='d-flex flex-column  gap-3 '>
        <Typo variant={"lg"} fw={"bolder"}>
          Título responsable
        </Typo>
        {
          <Jodit
            onChange={(e) => setResTit({...resTit, res_tit: e})}
            content={aboutData?.res_tit}
          />
        }
      </div>
      <div className='d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          imagen responsable
        </Typo>

        <DnDFile
          fileUrl={resUrl}
          setFileUrl={setResUrl}
          file={resUrl}
          setFile={setResUrl}
        />
      </div>

      
    </div>
  );
};

export default AboutContent;
