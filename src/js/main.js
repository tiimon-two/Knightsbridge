import '../styles/style.scss';
import {markers} from './mock.js';
import setSlider from './slider.js';
import initMap from './map.js';
import setDownload from './download.js';

setSlider();
initMap(markers);
setDownload();