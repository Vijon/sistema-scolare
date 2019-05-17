import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { get } from './services/Config'
import App from "./containers/App";

const Root = ({ store }: any) => (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

export default Root;