import { User, Error } from '../../types';

export const Actions = {
    LOGGED_IN: "LOGGED_IN",
    LOGGED_OUT: "LOGGED_OUT",
    SET_ALERT: "SET_ALERT",
    SET_ERROR: "SET_ERROR",
    SET_PLANETS: "SET_PLANETS",
    SET_CURRENT: "SET_CURRENT",
    SET_VISITING_PLANET: "SET_VISITING_PLANET"
};

export const setAlert = (alert: any) => {
    return {
        type: Actions.SET_ALERT,
        alert
    }
}

export const setError = (err: Error) => {
    return {
        type: Actions.SET_ERROR,
        err
    }
}

export const setAuthentication = ( user: User ) => {
    return {
        type: Actions.LOGGED_IN,
        user
    };
};

export const forgetAuthentication = ( ) => {
    return {
        type: Actions.LOGGED_OUT
    };
};

export const setPlanets = ( planets: any ) => {
    return {
        type: Actions.SET_PLANETS,
        planets
    };
};

export const setCurrent = ( id: any ) => {
    return {
        type: Actions.SET_CURRENT,
        current: id
    };
};

export const resetCurrent = ( ) => {
    return {
        type: Actions.SET_CURRENT,
        current: null
    };
};

export const setVisitingPlanet = (id: any) => {
    return {
        type: Actions.SET_VISITING_PLANET,
        visiting: id
    };
}

