import { firefox } from 'playwright'

(async () => {
    const browser = await firefox.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://ringus-elearning.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19223760#overview')
    //   const [response] = await Promise.all([
    //     page.waitForNavigation(), // The promise resolves after navigation has finished
    //   ]);

    page.on('domcontentloaded',(page)=> {
        console.log(page.url());
    })

    browser.on("disconnected",(browser) => {
        browser.close();
    })
})();