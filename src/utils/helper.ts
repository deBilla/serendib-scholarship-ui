import { getBlobArrayForFolder } from "../services/AWSConfig";
import JSZip from "jszip";

const downloadBlobArrayToZip = async (
  bucketName: string,
  folderPath: string
) => {
  const blobArr = await getBlobArrayForFolder(bucketName, folderPath);
  const zip = new JSZip();

  for (const blob of blobArr ? blobArr : []) {
    if (blob) {
      zip.file(blob.name ? blob.name : "undefined", blob.blob);
    }
  }

  const zipFile = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(zipFile);

  const link = document.createElement("a");
  link.href = url;
  const folderNameArr = folderPath.split('/');
  link.download = folderNameArr.length > 1 ? `${folderNameArr[0]}-${folderNameArr[1]}.zip` : `${folderNameArr[0]}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export { downloadBlobArrayToZip };
