import { putSignedFileUrl, test1 } from "./controller.js";
import { Router } from "express";
import bodyParser from "body-parser";
import fileOps from "../db.js";
import {getFileInfo} from "../db.js";

const router = new Router();

var jsonParser = bodyParser.json();

router.post("/test", jsonParser, test1);
router.post("/putUrl", jsonParser, putSignedFileUrl);
router.post("/fileInfo", jsonParser, fileOps.addFileInfo);
router.get("/fileInfo", fileOps.getFilesInfo);
router.post("/dbtest", jsonParser, getFileInfo);

export default router;
