import { connect } from "react-redux";
import App from "../components/App";
import { mergeProps } from "./helpers";

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        
    };
};

const container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);

export default container;
