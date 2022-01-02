import { Page } from "puppeteer";

export class Logger {
    constructor(private isDebug: boolean) { }

    log(str: string): void {
        console.log(`\tLOG: ${str}`);
    }

    debug(...objs: Array<Object>): void {
        if(this.isDebug) console.debug(...objs);
    }
}

/**
 * Routines should run and then return to the main Videon Page
 */
export interface Routine {
    name: string;
    description: string;
    start: (page: Page, config: any, logger: Logger) => Promise<void>;
}

export class RoutineFactory {
    async runRoutine<T extends Routine>(routineType: (new () => T), page: Page, config: any) {
        const routine = new routineType();
        const logger = new Logger(config.debug);
        console.log(`\nRunning routine '${routine.name}':\n\t- ${routine.description}`);
        try {
            await routine.start(page, config, logger);
        } catch(error) {
            console.error(`\tERROR: Error in routine '${routine.name}'... skipping`);
            console.debug(`\t\tDEBUG: ${error}`)
        }
    }
}