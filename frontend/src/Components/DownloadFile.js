import { Component } from "react";
import { useParams } from "react-router";

function DownloadFile() {
    let { downloadCode } = useParams();

        return(
            <div>
              <h2>Download page</h2>
              <h2>{downloadCode}</h2>
            </div>
          )
}

export default DownloadFile;