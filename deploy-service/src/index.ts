import { createClient } from "redis";
const redisClient =createClient({
    url:"redis://localhost:6379"
});
redisClient.connect();

const redisQueueIdPop = async ()=>{
    while(true){
    const result = await redisClient.brPop("build-queue",0);
    
    console.log(result);
}
}




