import { InputSelectRoutine } from './routines/input_select.routine';
import { EncoderSettingsRoutine } from './routines/encoder_settings.routine';
import { OutputSettingsRoutine } from './routines/output_settings.routine';

export default {
    debug: true,
    url: "http://localhost:8080",
    routines: [
        InputSelectRoutine,
        EncoderSettingsRoutine,
        OutputSettingsRoutine
    ],
    closingText: '\nAll routines completed! If problems still persist, call Jay at (272)201-4307 or Ed at (570)992-2992.',
    facebook: {
        streamUri: 'live-api-s.facebook.com:443/rtmp/',
        streamKey: 'FB-4557803224297266-0-AbzKgPTxjpSKDdVF'
    }
};
