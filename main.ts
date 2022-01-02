import * as puppeteer from 'puppeteer';
import config from './config.js';
import { RoutineFactory } from './routines/routine';

async function main() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(config.url);

        const routineFactory = new RoutineFactory();
        for(let routine of config.routines) await routineFactory.runRoutine(routine, page, config);
        console.log(config.closingText);

        await browser.close();
    } catch (err) {
        console.error('Error in main', err);
    }
}

main();