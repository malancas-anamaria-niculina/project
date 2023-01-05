import { Router } from "express";
import router from "./S3/index.js";

const rout = Router();

rout.use("/s3", router);

export default rout;
