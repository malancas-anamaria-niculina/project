import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { addFileInfo, getFileInfo } from "../db.js";
import dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const REGION = process.env.AWS_REGION;
const BUCKET = process.env.AWS_S3_BUCKET;

const config = {
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: REGION,
};

// Instantiate new S3 client
const client = new S3Client(config);

export const putSignedFileUrl = async (request, response, next) => {
  // Instantiate PostObject command
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: request.body.filename,
    Body: request.body.body,
  });
  const expires = request.body.expiresIn;
  request.body.upload_path = "none";
  request.body.storage = "S3";

  await client.send(command);

  //const response = await client.send(command);
  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

  request.body.signedUrl = signedUrl;
  addFileInfo(request, response);
  //return response.status(200).json({ signedUrl: signedUrl });
};

export const getSignedFileUrl = async (request, response, next) => {
  // Instantiate GetObject command
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: request.params.filename,
  });
  const expires = request.params.expiresIn;

  const signedUrl = await getSignedUrl(client, command, { expiresIn: expires });
  response.status(200).send({
    status: "Success",
    data: {
      signedUrl: signedUrl,
      filename: request.params.filename,
      storage: request.params.storage,
    },
  });
};

export const test1 = async (req, response) => {
  return response
    .status(200)
    .json({ status: "Success", data: { body: req.body } });
};
