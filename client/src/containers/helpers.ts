//import { push } from "react-router-redux";
import { store } from "../store/store";

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}
/*
export function pushPath( path ) {
    store.dispatch(push(path));
}
*/