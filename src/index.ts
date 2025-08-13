import express,{Request,Response} from "express";
import cors from "cors";
import path from "path";
import { generateRandomString } from "./randomString";
import simpleGit, { pathspec } from "simple-git";
import { getAllFiles } from "./getAllfiles";
const git = simpleGit();
const PORT  = 3000;
const app = express();
app.use(express.json());
app.use(cors());
const deployHandler = async (req:Request,res:Response)=>{
    const url = req.body.repoUrl;
    if(!url){
        res.json({msg:"give a github repo url"})
    }
    const uniqueid = generateRandomString();
   await git.clone(url,path.join(__dirname+`/output/${uniqueid}`));
   const allFiles:string[] = getAllFiles(path.join(__dirname+`/output/${uniqueid}`));
    
   res.json({msg:""})
    
}

app.post("/deploy",deployHandler);

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})