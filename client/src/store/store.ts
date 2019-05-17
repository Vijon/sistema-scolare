import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk"
import logger from "redux-logger";

import { RootReducer } from "./reducers/root";

/***
 * Enhancer for storybook addon redux
 */
// @ts-ignore
import withReduxEnhancer from 'addon-redux/enhancer'
const createMiddlewareEnhancer = () => {
    const middleware = []
    if (process.env.NODE_ENV !== 'production') {
        // include other middlewares as needed, like the invariant and logger middlewares
        middleware.push(logger);
    }
    return applyMiddleware(...middleware)
}

const createEnhancer = () => {
    const enhancers = []
    enhancers.push(createMiddlewareEnhancer())
    if (process.env.NODE_ENV !== 'production') {
        enhancers.push(withReduxEnhancer)
    }
    return compose(...enhancers) as any;
}

const store = createStore(RootReducer, createEnhancer())

/*
const initialState = {
};

const store = createStore(
    RootReducer,
    initialState,
    applyMiddleware(logger) 
);
*/

export {
    store,
};