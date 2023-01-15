import fs from 'fs';
import { addFileInfo, getFileInfo } from '../db.js';

export const saveFile = (request, response) => {
    const file_path = `D:\\Projects\\project\\saved_files\\${request.body.filename}`;
    fs.writeFile(file_path, request.body.body, (err) => {
        if (err){
            throw err;
        };
        console.log("Saved");
    });
    request.body.upload_path = file_path;
    request.body.storage = "local";
    addFileInfo(request, response);
};
