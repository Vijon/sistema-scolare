import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import './index.css';
import { store } from "./store/store";
import * as Config from './services/Config';
import Root from './Root';

import { route } from "./services/Router";
import * as PWA from './services/PWA';

route.init();
/*
PWA.init();
PWA.initAddToHome();
*/
PWA.unregisterSW();

const ga = Config.get('google_analytics');
if (ga) {
    ReactGA.initialize( ga );
    ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
