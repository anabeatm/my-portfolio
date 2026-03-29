import { initTime } from "./time.js";
import { openPage } from "./windows.js";
import { initWeather } from "./weather.js";
import { initSettings } from "./settings.js";

initTime();
initWeather();
initSettings();

window.openPage = openPage;
