import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path"

export const getAllFiles = (dir:string):string[]=>{
    const ignoreList = ['.git'];
    let allFiles: string[]= [];
    const allFilesAndFolders  = fs.readdirSync(dir);
    allFilesAndFolders.forEach((file)=>{
        if(ignoreList.includes(file))return;
        const fullPath = path.join(dir,file);
        if(fs.statSync(fullPath).isDirectory()){
            allFiles = allFiles.concat(getAllFiles(fullPath));
        }
        else {
            allFiles.push(fullPath);
        }
    })
return allFiles};

const s3 = new S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    endpoint: process.env.ENDPOINT
});
export const uploadToS3 = async (file: string, localfilepath: string) => {
    const fileContent = fs.readFileSync(localfilepath);
    try {
        const Response = await s3.upload({
            Body: fileContent,
            Bucket: "newBucket",
            Key: file,
        }).promise();
        console.log("✅ Upload successful");
        console.log("response:", Response);
    }
    catch (err: any) {
        console.log(`the error while uploading ${err}`)
    }
}