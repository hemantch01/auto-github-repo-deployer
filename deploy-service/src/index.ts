import { createClient } from "redis";
import { downloadFilesFromS3 } from "./s3Logic";
import { buildProject } from "./buildProj";
import { getAllFiles,uploadToS3 } from "./uploadToS3";
const redisClient =createClient({
    url:"redis://localhost:6379"
});
redisClient.connect();

const redisQueueIdPop = async ()=>{
    while(true){
    const result = await redisClient.brPop("build-queue",0);
    if(result!==null){
        await downloadFilesFromS3(result.key);
        console.log("file downloaded from s3");
        await buildProject(result.key); // the project is builded inside .../dist/output/${result.key}/dist => has all the html and css files 
        console.log("build process completed");
      const allFiles:string [] =   getAllFiles(result.key);
        allFiles.forEach(async (file)=>{
        await uploadToS3(`dist/${result.key}/`+file.slice(__dirname.length+1),file);
    })
        }
    }

}




