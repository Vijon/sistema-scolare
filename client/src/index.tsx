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
PWA.init();
PWA.initAddToHome();

const ga = Config.get('google_analytics');
if (ga) {
    ReactGA.initialize( ga );
}

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
