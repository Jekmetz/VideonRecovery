import { Page } from "puppeteer";

export default interface Routine {
    start: (page: Page) => void;
}