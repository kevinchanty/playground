import { chromium } from 'playwright'
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const {AC, PW} = process.env;
if (!AC || !PW) {
    throw("No dotenv?")
}


(async () => {
    const buffer = fs.readFileSync("./record.json",{encoding:"utf-8"});
    const record = JSON.parse(buffer);

    const browser = await chromium.launch({
        headless:false,
        channel:"chrome-canary",
    });

    process.on("SIGINT", ()=> {
        console.log("\nokok, Im leaving");
        
        browser.close();
        return;
       
    })

    const page = await browser.newPage();
    await page.goto('https://ringus-elearning.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19223760#overview',{
        waitUntil:"load"
    });

    await page.fill("#form-group--2",AC,{timeout:5000});
    await page.locator('button[type="submit"]').click()
    await page.fill("#form-group--3",PW,{timeout:50000});
    await page.locator('button[type="submit"]').click()
    

    page.on('domcontentloaded',(page)=> {
        console.log(page.url());
    })
})();

