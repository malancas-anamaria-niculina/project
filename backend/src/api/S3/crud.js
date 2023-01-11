import {client} from '../../app.js';


const addFileInfo = (request, response) => {
  const { name, size, download_link, uploaded_time } = request.body;
  console.log(request.body);
    async() => {
      await client.connect((err) => {
        if (err){
          throw err;
        }
        console.log("Connection succesfully done");
      });
      console.log(client);
      client.query('INSERT INTO file (file_name, size, download_link, uploaded_time) VALUES ($1, $2, $3, $4)', [name, size, download_link, uploaded_time], (err, result)=>{
        if(!err){
          response.status(201).send(`File information added with ID: ${res.insertId}`);
        }});
      client.end;
    }
}

const getFilesInfo = (request, response) => {
  async() => {
    await client.connect((err) => {
      if (err){
        throw err;
      }
      console.log("Connection succesfully done");
    });
    client.query('SELECT * FROM file')
      .then(res => {
          response.status(200).send(res);
      })
      .catch(err => {
        throw err;
      })
      .finally(() => {
        client.end();
      });
  }
}

export default {
  addFileInfo,
  getFilesInfo
};