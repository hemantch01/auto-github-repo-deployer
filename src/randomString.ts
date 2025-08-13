const SIZE = 5;
export const generateRandomString = ()=>{
    let randomString = "";
    const baseString = "abcdefghijklmnopqrstuvwxyz1234567890";
    for(let i=0;i<SIZE;i++){
        const randomChar = baseString[Math.floor(Math.random()*baseString.length)];
        randomString+=randomChar;
    }
    return randomString;
}