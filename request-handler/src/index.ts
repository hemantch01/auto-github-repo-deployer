import express,{Request,Response} from "express";

const app = express();
app.use(express.json());

const allRouteCatcher = (req:Request,res:Response)=>{
    const host = req.hostname;
    const id = host.split('.')[0];
    
}

app.get("/:param",allRouteCatcher);


app.listen(3001,()=>{
    console.log('app si lisstemning ')
});