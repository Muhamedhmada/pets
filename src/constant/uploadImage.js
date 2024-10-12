import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  console.log("image", file) 
  formData.append("image", file);
  return await axios.post("https://camp-coding.site/pets/api/img_upload", formData, {
    headers: {
      "Content-Type":"multipart/form-data"
    }
  });
};