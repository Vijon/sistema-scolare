import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from "./store/store";
import Root from './Root';

import { route } from "./services/Router";
import * as PWA from './services/PWA';

route.init();
PWA.init();
PWA.initAddToHome();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
