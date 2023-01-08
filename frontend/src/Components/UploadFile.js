import axios from "axios";
import { Button } from "@mui/material";

function UploadFile() {
  const showFile = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    console.log(await file.text());
    console.log(file.size);
    const axiosConf = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    const url = "http://localhost:8080/api/s3/putUrl";
    const response = await Promise.resolve(
      axios
        .post(
          url,
          {
            filename: file.name,
            body: fileContent,
            expiresIn: 60,
          },
          axiosConf
        )
        .then((response) => response.data)
    );
    axios
      .put(response.signedUrl, axiosConf)
      .then((response) => console.log(response))
      .catch((error) => {
        console.warn(error);
      });
  };
  return (
    <div>
      <p>Upload files</p>
      <Button type="submit" variant="contained" component="label">
        Upload
        <input hidden accept="file/*" multiple type="file" onChange={showFile} />
      </Button>
    </div>
  );
}

export default UploadFile;
