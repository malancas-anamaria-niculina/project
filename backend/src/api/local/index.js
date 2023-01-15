import { saveFile } from "./controller.js";
import { Router } from "express";
import bodyParser from "body-parser";
import { getFileInfo } from "../db.js";

const router = new Router();

var jsonParser = bodyParser.json();

router.post("/saveFile", jsonParser, saveFile);
router.post("/downloadFile", jsonParser, getFileInfo);

export default router;