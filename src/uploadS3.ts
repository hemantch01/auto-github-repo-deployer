import { S3 } from "aws-sdk";
import fs from "fs";
const s3 = new S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    endpoint: process.env.ENDPOINT
});

export const uploadFile= async (file:string,localfilepath:string)=>{
    const fileContent = fs.readFileSync(localfilepath);
   const Response =  s3.upload({
        Body:fileContent,
        Bucket:"newBucket",
        Key:file,
    }).promise();
    console.log(Response);
}