import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';


function readFile(file: string){
    let text;

    try{
        text = (readFileSync(file, "utf-8"));
    }catch(ERROR){
        console.error(`ERROR: File ${file} not found`);
        process.exit(1);
    }
    return text;
}

console.log(readFile('./hello.txt'));