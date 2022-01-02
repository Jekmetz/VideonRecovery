import { Page } from 'puppeteer';
import { Routine } from './routine';

export class InputSelectRoutine implements Routine {
    name = 'AV Input Type';
    description = 'Change AV Input Type to "Auto Detect"';

    public async start(page: Page) {
        const selectSelector = 'body > div > div > div > div.content-area.encoder-control > table > tbody > tr > td.text-center.col2 > select';
        await page.waitForSelector(selectSelector);
        await page.select(selectSelector, '4');    
    }
}