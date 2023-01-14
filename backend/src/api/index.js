import { Router } from "express";
import s3_router from "./S3/index.js";
import local_router from "./local/index.js";

const router = Router();

router.use("/s3", s3_router);
router.use("/local", local_router);

export default router;
