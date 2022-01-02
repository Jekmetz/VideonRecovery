import { Page } from 'puppeteer';
import { Logger, Routine } from './routine';

export class OutputSettingsRoutine implements Routine {
    name = 'Adjust Output Settings';
    description = 'Set output RTMP settings';
    
    async start(page: Page, config: any, logger: Logger) {
        const outputOptionsButSel = 'body > div > div > div > div.content-area.encoder-control > table > tbody > tr > td.col7 > a';
        const outputOnCheckSel = '#outputModal > div.modal-dialog > div > div.modal-middle > div.modal-body > div:nth-child(5) > div > div > form > div.bootstrap-switch.bootstrap-switch-wrapper.bootstrap-switch-small.bootstrap-switch-animate.bootstrap-switch-on > div > input[type=checkbox]';
        const typeofRTMPSel = '#outputModal > div.modal-dialog > div > div.modal-middle > div.modal-body > div:nth-child(5) > div > div > form > select';
        const uriPrefixSel = '#outputModal > div.modal-dialog > div > div.modal-middle > div.modal-body > div:nth-child(5) > div > div > form > span:nth-child(13) > select';
        const uriInpSel = '#outputModal > div.modal-dialog > div > div.modal-middle > div.modal-body > div:nth-child(5) > div > div > form > span:nth-child(13) > input';
        const okButSel = '#outputModal > div.modal-dialog > div > div.modal-footer > button.btn.btn-primary.btn-dialog';

        // Click output Options selector
        await Promise.all([
            page.waitForSelector(outputOnCheckSel),
            page.click(outputOptionsButSel)
        ]);
        
        // RTMP 1 loads by default

        // Switch to type 'Generic RTMP'
        await page.select(typeofRTMPSel, '0');
        logger.log('Selected Generic RTMP for RTMP 1');

        // switch uri prefix to rtmps://
        await page.select(uriPrefixSel, 'rtmps');
        logger.log(`Set prefix to 'rtmps://'`);

        // modify uri
        const uriInp = await page.$(uriInpSel);
        await uriInp.click({ clickCount: 3 });
        await uriInp.type(`${config.facebook.streamUri}${config.facebook.streamKey}`);
        logger.log(`Set stream URI to '${config.facebook.streamUri}${config.facebook.streamKey}'`);

        // Check rtmp output if not checked
        // Turn stream on
        const checkbox = await page.$(outputOnCheckSel);
        const isChecked = await (await checkbox.getProperty('checked')).jsonValue();
        if (!isChecked) {
            logger.log(`Turned RTMP 1 output on`);
            page.click(outputOnCheckSel);
        }

        // Hit OK
        await page.click(okButSel);

        // wait for dialog to close
        await page.waitForSelector(okButSel, {hidden: true});
    }
}