import { pool } from "../../app.js";

export const addFileInfo = (request, response) => {
  const { file_name, size, download_link } = request.body;
  const uploaded_time = new Date();
  pool.connect((err, client, done) => {
    const query =
      "INSERT INTO files(file_name, size, download_link, uploaded_time) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [file_name, parseFloat(size), download_link, uploaded_time];
    client.query(query, values, (error, result) => {
      done();
      if (error) {
        console.log(error);
      }
      response
        .status(200)
        .send({ status: "Success", data: { result: result.rows[0] } });
    });
  });
};

const getFilesInfo = (request, response) => {
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

export default {
  addFileInfo,
  getFilesInfo,
};
