import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./containers/App";
import Error from "./components/Fundamentals/Error";

const Root = ({ store }: any) => (
    <Provider store={store}>
        <BrowserRouter>
            <Error>
                <App />
            </Error>
        </BrowserRouter>
    </Provider>
);

export default Root;