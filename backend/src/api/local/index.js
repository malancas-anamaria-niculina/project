import { saveFile, deleteFile } from "./controller.js";
import { Router } from "express";
import bodyParser from "body-parser";
import { getFileInfo } from "../db.js";

const router = new Router();

var jsonParser = bodyParser.json();

router.post("/saveFile", jsonParser, saveFile);
router.get("/downloadFile/:download_code", getFileInfo);
router.post("/file/:download_code", jsonParser, deleteFile);

export default router;
