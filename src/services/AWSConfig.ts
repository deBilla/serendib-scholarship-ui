import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  DeleteObjectsCommand,
  DeleteObjectCommand,
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

const getSignedUrlForFile = async (bucketName: string, fileName: string, folderPath: string) => {
  const bucketParams = {
    Bucket: bucketName,
    Key: `${folderPath}/${fileName}`,
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
    Bucket: bucketName,
    Key: `${type}/${id}/${fileName}`,
    Body: file,
  };

  try {
    return await s3Client.send(new PutObjectCommand(bucketParams));
  } catch (e) {
    throw e;
  }
};

const listFilesInFolder = async (bucketName: string, folderPath: string) => {
  const bucketParams = {
    Bucket: bucketName,
    Prefix: folderPath,
  };

  const fileList = await s3Client.send(new ListObjectsCommand(bucketParams));

  if (!fileList.Contents) {
    console.error("The folder is empty");
    return;
  }

  return fileList.Contents;
};

const getBlobArrayForFolder = async (
  bucketName: string,
  folderPath: string
) => {
  const fileList = await listFilesInFolder(bucketName, folderPath);
  const fileListArr = fileList ? fileList : [];

  const blobArr = [];

  for (const file of fileListArr) {
    const signedUrl = await getSignedUrlForFile(
      bucketName,
      file.Key ? file.Key : "undefined",
      folderPath
    );
    const response = await fetch(signedUrl);
    console.log(response);
    blobArr.push({ blob: response.blob(), name: file.Key });
  }

  return blobArr;
};

const deleteFolder = async (bucketName: string, folderPath: string) => {
  const fileList = await listFilesInFolder(bucketName, folderPath);
  const fileListArr = fileList ? fileList : [];
  const objectsToDelete = fileListArr.map((object) => ({
    Key: object.Key,
  }));
  if (objectsToDelete.length > 0) {
    const deleteObjectsCommand = new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: { Objects: objectsToDelete },
    });
    await s3Client.send(deleteObjectsCommand);
  }

  // Delete the folder itself
  const deleteFolderCommand = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: folderPath,
  });
  await s3Client.send(deleteFolderCommand);
};

export { getSignedUrlForFile, fileUpload, getBlobArrayForFolder, deleteFolder };
