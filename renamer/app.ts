import readlineSync from 'readline-sync';
import { readdir,rename } from 'fs/promises';
import fs from 'fs'

// const myPath = "J:\\System"

console.log("Renamer");

const menu = ['Start', 'Setting'];
const index = readlineSync.keyInSelect(menu, 'Welcome');

if (index === 0) {
    list(myPath)
}

async function list(path: string) {
    try {
        const dir = await readdir(path, { withFileTypes: true });
        for await (const dirent of dir) {
            if (dirent.isDirectory()) {
                list(path + `\\${dirent.name}`)
            }else {
                const arr = dirent.name.split(".")
                const extension = arr[arr.length-1]
                if (extension === "jpg") {
                    rename(path + dirent.name, path + "background.jpg")
                }else if (extension === "png") {
                    rename(path + dirent.name, path + "poster.png")
                }
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}

