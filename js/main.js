import { initTime } from "./time.js";
import { openPage } from "./windows.js";
import { initWeather } from "./weather.js";
import { initSettings } from "./settings.js";
import { initLang } from "./lang.js";

initTime();
initWeather();
initSettings();
initLang();

window.openPage = openPage;
