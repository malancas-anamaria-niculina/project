import { saveFile } from "./controller.js";
import { Router } from "express";
import bodyParser from "body-parser";
import fileOps from "../db.js";

const router = new Router();

var jsonParser = bodyParser.json();

router.post("/saveFile", jsonParser, saveFile);

export default router;