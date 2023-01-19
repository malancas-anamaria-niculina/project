import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import { axiosConf } from "../common";

function UploadFile() {
  const [temporary_file_check, setTemporaryFile] = useState(true);
  const [file_upload, setFileData] = useState("");
  const [not_uploaded, setFileUploaded] = useState(true);

  const showFile = async (event) => {
    const file = event.target.files[0];
    const URL = "http://localhost:8080/api"
    const url = temporary_file_check ? `${URL}/local/saveFile` : `${URL}/s3/putUrl`;
    const fileContent = await file.text();

    const response = await Promise.resolve(
      axios
        .post(
          url,
          {
            filename: file.name,
            filesize: file.size,
            body: fileContent,
            expiresIn: 60,
          },
          axiosConf
        )
        .then((response) => response.data)
    );

    response.data.download_link = "http://localhost:3000/downloadFile/" + response.data.code;
    setFileData(response.data);
    setFileUploaded(false);

    if (!temporary_file_check){
      axios
        .put(response.signedUrl, axiosConf)
        .then((response) => console.log(response))
        .catch((error) => {
          console.warn(error);
        });
    }
      
  };

  const handleOnChange = () => {
    setTemporaryFile(!temporary_file_check);
  };

  return (
    <div>
      <p>Upload files</p>
      <input
          type="checkbox"
          id="temp_file"
          name="temp_file"
          checked={temporary_file_check}
          onChange={handleOnChange}
        />
        <label htmlFor="temp_file">Store temporary file</label>
        <br/><br/><br/>
      <Button type="submit" variant="contained" component="label">
        Upload
        <input hidden accept="file/*" multiple type="file" onChange={showFile} />
      </Button>
      {!!!not_uploaded && <p>You uploaded the file with name {file_upload.filename} on {file_upload.upload_time}.</p>}
      {!!!not_uploaded && <p>Download link: <a href="file_upload.download_link">{file_upload.download_link}</a>.</p>}
    </div>
  );
}

export default UploadFile;
