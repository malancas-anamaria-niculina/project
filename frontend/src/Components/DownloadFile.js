import { useParams } from "react-router";
import axios from "axios";
import { axiosConf } from "../common";
import { useEffect, useState, useCallback } from "react";

function DownloadFile() {
    let { downloadCode } = useParams();
    const [downloadMessage, setDownloadMessage] = useState("");
    const [downloaded, setDownloaded] = useState(false);

    const downloadFile = useCallback(async () => {
        let storage = localStorage.getItem("temporary_file_check");
        console.log(storage);
        const URL = `http://localhost:8080/api/${storage}/downloadFile/${downloadCode}`;
        const response = await Promise.resolve(
        axios
          .get(
            URL,
            axiosConf
          )
          .then((response) => response.data)
      );
        return response.data;
    }, [downloadCode]);

    const downloadS3File = useCallback(async (URL) => {
      console.log(URL);
      const response = await Promise.resolve(
      axios
        .get(
          URL,
          axiosConf
        )
        .then((response) => response.data)
    );
      return response;
  }, []);

    const deleteFile = useCallback(async (downloadPath) => {
      const URL = `http://localhost:8080/api/local/file/${downloadCode}`;
      const response = await Promise.resolve(
      axios
        .post(
          URL,
          {
            filePath: downloadPath,
          },
          axiosConf,
        )
        .then((response) => response.data)
    );
      return response.data;
  }, [downloadCode]);

    const download = (fileContent, filename) => {
        const url = window.URL.createObjectURL(new Blob([fileContent], {
            type: 'text/plain'
        }));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setDownloadMessage(`File ${filename} downloaded successfully`);
    }

    const asyncDownload = useCallback(async () => {
            setDownloaded(true);
            const data = await downloadFile();
            const storage = localStorage.getItem("temporary_file_check")
            data.fileContent = storage === "local" ? data.fileContent : await downloadS3File(data.signedUrl);
            download(data.fileContent, data.filename);
            if (storage === "local"){
              deleteFile(data.downloadPath);
            }
        }
     , [downloadFile, deleteFile, downloadS3File]);

    useEffect(() => {
        if (!downloaded){
            asyncDownload();
        }
    }, [downloaded, asyncDownload]);

    return(
        <div>
          <h2>Download page</h2>
          <h2>{downloadMessage}</h2>
        </div>
      )
}

export default DownloadFile;