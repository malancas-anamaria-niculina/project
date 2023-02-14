import { Router } from "express";
import s3_router from "./S3/index.js";
import local_router from "./local/index.js";
import { getStorage } from "./db.js";

const router = Router();

router.use("/s3", s3_router);
router.use("/local", local_router);
router.get("/storage/:download_code", getStorage);

export default router;
