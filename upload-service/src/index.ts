import express,{Request,Response} from "express";
import cors from "cors";
import path from "path";
import { createClient } from "redis";
import { generateRandomString } from "./randomString";
import simpleGit from "simple-git";
import { getAllFiles } from "./getAllfiles";
import {  uploadFile } from "./uploadS3";
import 'dotenv/config';
const git = simpleGit();
const PORT  = 3000;
const app = express();
app.use(express.json());
app.use(cors());
const redisClient = createClient({
  url: "redis://localhost:6379"
});
redisClient.connect();
const deployHandler = async (req:Request,res:Response)=>{
    const url = req.body.repoUrl;
    if(!url){
        res.json({msg:"give a github repo url"})
    }
    const uniqueid = generateRandomString();
   await git.clone(url,path.join(__dirname+`/output/${uniqueid}`));
   const allFiles:string[] = getAllFiles(path.join(__dirname+`/output/${uniqueid}`));
    allFiles.forEach(async (file)=>{
        await uploadFile(file.slice(__dirname.length+1),file);
    })
    redisClient.lPush("build-queue",uniqueid);
   res.json({id:uniqueid});
    
}

app.post("/deploy",deployHandler);

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})