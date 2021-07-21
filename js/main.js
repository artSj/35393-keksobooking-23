import {deactivatePage, validateForm} from './form.js';
import {getOffers} from './server.js';

deactivatePage();
getOffers();
validateForm();
