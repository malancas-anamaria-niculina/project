import fs from 'fs';
import { resolve } from 'path';
import { addFileInfo, deleteFileInfo } from '../db.js';

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

export const donwloadFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
};

export const deleteFile = (request, response) => {
    console.log(request);
    console.log(request.body);
    fs.unlinkSync(request.body.filePath);

    deleteFileInfo(request, response);
}