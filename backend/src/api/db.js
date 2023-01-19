import { pool } from "../app.js";
import crypto from './common.js';
import { donwloadFile } from "./local/controller.js";

export const addFileInfo = (request, response) => {
  const { filename, filesize, upload_path, storage } = request.body;
  const uploaded_time = new Date();
  const download_code = crypto.encrypt(filename + uploaded_time).slice(10,30);
  pool.connect((err, client, done) => {
    const query =
      "INSERT INTO files(file_name, size, download_code, uploaded_time, upload_path, storage) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [filename, parseFloat(filesize), download_code, uploaded_time, upload_path, storage];
    client.query(query, values, (error, result) => {
      done();
      if (error) {
        console.log(error);
      }
      if (request.body.storage != "S3"){
        response
        .status(200)
        .send({ status: "Success", data: { filename: filename, upload_time: uploaded_time, download_code: `/${storage}/downloadFile/${download_code}`, code: download_code } });
      }
    });
  });
};

export const getFilesInfo = (request, response) => {
  pool.connect((err, client, done) => {
    const query = "SELECT * FROM files";
    client.query(query, (error, result) => {
      done();
      if (error) {
        console.log(error);
      }
      response
        .status(200)
        .send({ status: "Success", data: { result: result.rows } });
    });
  });
};

export const getFileInfo = async (request, response) => {
  pool.connect((err, client, done) => {
    const query = `SELECT * FROM files WHERE download_code='${request.params.download_code}'`;
    client.query(query, (error, result) => {
      done();
      if (error) {
        console.log(error);
      }
      const fileContent = donwloadFile(result.rows[0].upload_path);
      response
        .status(200)
        .send({ status: "Success", data: { filename: result.rows[0].file_name, downloadPath: result.rows[0].upload_path, fileContent: fileContent } });
    });
  });
};

export const deleteFileInfo = async (request, response) => {
  pool.connect((err, client, done) => {
    const query = `DELETE FROM files WHERE download_code='${request.params.download_code}'`;
    client.query(query, (error, result) => {
      done();
      if (error) {
        console.log(error);
      }
      response
        .status(200)
        .send({ status: "Success" });
    });
  });
};

export default {
  addFileInfo,
  getFilesInfo,
  getFileInfo
};
