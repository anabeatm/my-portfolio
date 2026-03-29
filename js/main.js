import { initTime } from "./time.js";
import { openPage } from "./windows.js";
import { initWeather } from "./weather.js";

initTime();
initWeather();

window.openPage = openPage;
