import express,{Request,Response} from "express";
import cors from "cors";
import { generateRandomString } from "./randomString";
import simpleGit from "simple-git";
const git = simpleGit();
const PORT  = 3000;
const app = express();
app.use(express.json());
app.use(cors());

const deployHandler = (req:Request,res:Response)=>{
const url = req.body.repoUrl;
if(!url){
    res.json({msg:"give a github repo url"})
}
const uniqueid = generateRandomString();
git.clone(url,__dirname+`/${uniqueid}`);
res.json({msg:""})

}
app.post("/deploy",deployHandler);

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})