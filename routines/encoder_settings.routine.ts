import { Page } from 'puppeteer';
import { Logger, Routine } from './routine';

export class EncoderSettingsRoutine implements Routine {
    name = 'Adjust Encoder Settings';
    description = 'Set encoder settings';
    
    async start(page: Page, _, logger: Logger) {
        const encoderConfigureOptionsButSel = 'body > div > div > div > div.content-area.encoder-control > table > tbody > tr > td.col6 > a';
        const videoScalingDropdownSel = '#configModal > div.modal-dialog > div > div.modal-body > div:nth-child(2) > form > div:nth-child(2) > span.scaling-group > select';
        const limitTo30FPSSel = '#limitTo30FPS';
        const bitrateInputSel = '#configModal > div.modal-dialog > div > div.modal-body > div:nth-child(2) > form > div:nth-child(7) > input';
        const okButtonSel = '#configModal > div.modal-dialog > div > div.modal-footer > button.btn.btn-primary.btn-dialog';

        // Click encoder Options selector
        await Promise.all([
            page.waitForSelector(videoScalingDropdownSel),
            page.click(encoderConfigureOptionsButSel)
        ]);

        // Select 1920x1080p resolution
        await page.select(videoScalingDropdownSel, '7');
        logger.log('Set video scaling to 1920x1080p');

        // Limit to 30 FPS off
        const checkbox = await page.$(limitTo30FPSSel);
        const isChecked = await (await checkbox.getProperty('checked')).jsonValue();
        if (isChecked) {
            logger.log(`Removed limit to 30FPS`);
            page.click(limitTo30FPSSel);
        }

        // Set bitrate to 4000 kbps
        const bitrateInput = await page.$(bitrateInputSel);
        await bitrateInput.click({ clickCount: 3 });
        await bitrateInput.type('4000');
        logger.log('Set bitrate to 4000 kbps');

        // Hit OK
        await page.click(okButtonSel);

        // Wait for dialog to close
        await page.waitForSelector(limitTo30FPSSel, {hidden: true});
    }
}