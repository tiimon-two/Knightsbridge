import '../styles/style.scss';
import {markers} from './mock.js';
import setSlider from './slider.js';
import initMap from './map.js';
import setDownload from './download.js';
import { disableLink } from './utils.js';

const buttons = document.querySelectorAll('.intro__doc-button');

setSlider();
initMap(markers);
setDownload(buttons);
disableLink();