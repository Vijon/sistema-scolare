import { connect } from "react-redux";
import App from "../components/App";
import Api from "../services/Api";
import { route } from "../services/Router";
import { forgetAuthentication } from "../store/actions/app";
import { mergeProps } from "./helpers";

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onLogout: () => {
            Api.logout().then(() => {
                dispatch(forgetAuthentication());
                route.goto(`auth`);
            })
            .catch(err =>{
                console.log('error in logout')
            })
        },
    };
};

const container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);

export default container;
