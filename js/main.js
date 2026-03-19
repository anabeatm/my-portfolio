import { initTime } from "./time.js";
import { openPage } from "./windows.js";

initTime();

window.openPage = openPage;
