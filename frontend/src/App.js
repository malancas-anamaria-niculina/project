import "./App.css";
import axios from "axios";

function App() {
  const showFile = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const fileContent = reader.readAsText(file);
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
    <div className="App">
      <input type="file" id="uploadedFile" onChange={showFile} />
    </div>
  );
}

export default App;
