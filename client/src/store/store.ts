import { createStore, applyMiddleware, compose, Middleware, StoreEnhancer } from "redux";
// import thunk from "redux-thunk"
import logger from "redux-logger";

import { RootReducer } from "./reducers/root";

/***
 * Enhancer for storybook addon redux
 */
// @ts-ignore
const createMiddlewareEnhancer = () => {
    const middleware = [] as Middleware[];
    if (process.env.NODE_ENV !== 'production') {
        // include other middlewares as needed, like the invariant and logger middlewares
        middleware.push(logger);
    }
    return applyMiddleware(...middleware)
}

const createEnhancer = () => {
    const enhancers = [] as StoreEnhancer[];
    enhancers.push(createMiddlewareEnhancer())
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