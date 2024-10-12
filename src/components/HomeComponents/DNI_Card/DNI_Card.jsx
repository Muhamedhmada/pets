import React, {useEffect, useState} from "react";
import Typo from "../../../utils/Typo/Typo";
import ReactQuill from "react-quill";
import DnDFile from "../../../utils/DnD_file/DnDFile";

const DNI_Card = ({homeData, setHomeData , dniURl, setDniUrl}) => {
  const [dniFile, setDniFile] = useState(null);
  // const [dniURl, setDniUrl] = useState("");

  const hnadleChangeDNI_text = (e) => {
    setHomeData({...homeData, dni_txt: e});
  };

  useEffect(() => {
    if (dniFile) setHomeData({...homeData, dni_file: dniFile});
  }, [dniFile]);

  return (
    <div className='home_banner'>
      <div className='d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          Texto de mascotas registradas
        </Typo>

        <ReactQuill
          theme='snow'
          value={homeData?.dni_txt}
          onChange={(e) => {
            hnadleChangeDNI_text(e);
          }}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{header: 1}, {header: 2}],
              [{list: "ordered"}, {list: "bullet"}],
              [{script: "sub"}, {script: "super"}],
              [{indent: "-1"}, {indent: "+1"}],
              [{direction: "rtl"}],
              [{size: ["small", true, "large", "huge"]}],
              ["link", "image"],
              [{color: []}, {background: []}],
              [{font: []}],
              [{align: []}],
            ],
          }}
          style={{
            minHeight: "100px",
            color: "black",
            maxWidth: "100%",
            width: "100%",
          }}
        />
      </div>

      <div className='panner_image d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          Imagen
        </Typo>

        <DnDFile
          fileUrl={dniURl}
          setFileUrl={setDniUrl}
          file={dniFile}
          setFile={setDniFile}
        />
      </div>
    </div>
  );
};

export default DNI_Card;
