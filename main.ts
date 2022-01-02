import {launch} from "puppeteer";

const routines = [];

async function main() {
    try {
        const URL = 'http://192.168.1.2';
        const browser = await launch({headless: false});
        const page = await browser.newPage();

        await page.goto(URL);
    } catch (err) {
        console.error('Error in main', err);
    }
}

main();