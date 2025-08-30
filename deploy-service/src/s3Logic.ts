import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";

const s3 = new S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    endpoint: process.env.ENDPOINT
});

export const downloadFilesFromS3 = async (specifcPath:string)=>{
    // first fetch all the files from s3.
    const allFiles = await s3.listObjectsV2({
        Bucket:"newBucket",
        Prefix: specifcPath
    }).promise();

    const allPromises = allFiles.Contents?.map((file)=>{
        return new Promise<string>((resolve)=>{
            if(!file || !file.Key){
                resolve("");
                return;
            }
            const finalOutputPath = path.join(__dirname+file.Key);
            const outPutFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);
            if(!fs.existsSync(dirName)){
                fs.mkdirSync(dirName,{recursive:true});
            }
            s3.getObject({
                Bucket: "newBucket",
                Key:file.Key
            }).createReadStream().pipe(outPutFile).on("finish",()=>{
                resolve("");
            })
       
        })
    })
    console.log("awating");
    await Promise.all((allPromises ?? []).filter(x => x !== undefined));
}