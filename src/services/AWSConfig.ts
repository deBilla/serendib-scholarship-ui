import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const REGION = "us-east-1";
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY as string,
  },
});

const getSignedUrlForFile = async (bucketName: string, fileName: string) => {
  const bucketParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: "BODY",
  };

  try {
    const command = new GetObjectCommand(bucketParams);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return signedUrl;
  } catch (e) {
    throw e;
  }
};

const fileUpload = async (
  bucketName: string,
  fileName: string,
  type: string,
  id: string,
  file: Blob
) => {
  const bucketParams = {
    Bucket: "serendib-ui",
    Key: `${type}/${id}/${fileName}`,
    Body: file,
  };

  try {
    return await s3Client.send(new PutObjectCommand(bucketParams));
  } catch (e) {
    throw e;
  }
};

const getBlobArrayForFolder = async (
  bucketName: string,
  folderPath: string
) => {
  const bucketParams = {
    Bucket: bucketName,
    Prefix: folderPath,
  };

  const fileList = await s3Client.send(new ListObjectsCommand(bucketParams));

  if (!fileList.Contents) {
    console.error("The folder is empty");
    return;
  }

  const blobArr = [];

  for (const file of fileList.Contents) {
    const signedUrl = await getSignedUrlForFile(
      bucketName,
      file.Key ? file.Key : "undefined"
    );
    const response = await fetch(signedUrl);
    console.log(response);
    blobArr.push({blob: response.blob(), name: file.Key});
  }

  return blobArr;
};

export { getSignedUrlForFile, fileUpload, getBlobArrayForFolder };
