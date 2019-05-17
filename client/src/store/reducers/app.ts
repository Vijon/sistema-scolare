import { Actions } from "../actions/app";

const reducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case Actions.LOGGED_IN:
            return Object.assign({}, state, {
                user: action.user
            });
        case Actions.LOGGED_OUT:
            return Object.assign({}, state, {
                user: null,
                tree: null
            });
        case Actions.SET_ERROR:
            return Object.assign({}, state, {
                err: action.err
            });
        case Actions.SET_PLANETS:
            return Object.assign({}, state, {
                planets: action.planets
            });
        case Actions.SET_CURRENT:
            return Object.assign({}, state, {
                current: action.current
            });
        case Actions.SET_VISITING_PLANET:
            return Object.assign({}, state, {
                visiting: action.visiting
            });
        default:
            return state;
    }

}

export default reducer;