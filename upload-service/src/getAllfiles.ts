// i want to extract the file from the dist/id
import fs from "fs";
import path from "path";
export const getAllFiles = (dir:string):string[]=>{
    // dir is ../dist/id(folder)
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