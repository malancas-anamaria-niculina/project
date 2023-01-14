import { putSignedFileUrl, test1 } from "./controller.js";
import { Router } from "express";
import bodyParser from "body-parser";
import fileOps from "./crud.js";
import {addFileInfo} from "./crud.js";

const router = new Router();

var jsonParser = bodyParser.json();

router.post("/test", jsonParser, test1);
router.post("/putUrl", jsonParser, putSignedFileUrl);
router.post("/fileInfo", jsonParser, addFileInfo);
router.get("/fileInfo", fileOps.getFilesInfo);

export default router;
