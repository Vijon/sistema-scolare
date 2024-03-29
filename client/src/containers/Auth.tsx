import * as React from "react";
import { connect } from "react-redux";
import { setAlert, setError, setAuthentication, forgetAuthentication } from "../store/actions/app";
import { mergeProps /*, pushPath*/ } from "./helpers";
import { State, User, Error } from "../types";
import Api from "../services/Api";
import { route } from "../services/Router";
import Auth from "../components/Auth/Auth";

const mapStateToProps = (state: State) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onSession: (user: User) => {
            dispatch(setAuthentication(user));
        },
        onLogout: () => {
            dispatch(forgetAuthentication());
        },
        onLogin: (user: User) => {
            dispatch(setAuthentication(user));
        },
        onError: (err: Error) => {
            dispatch(setError(err));
        },
        onAlert: (msg: any) => {
            dispatch(setAlert(msg));
        }
    };
};

interface Props {
    onLogin: Function;
    onError: Function;
    onAlert: Function;
}

interface LocalState {
    phase: "IDLE" | "EXEC",
}

class Container extends React.Component<Props, LocalState> {
    state = {
        phase: "IDLE"
    } as LocalState;

    private afterJWT( $q: Promise<any> ) {
        const { onLogin, onError } = this.props;

        return new Promise( (resolve, reject) => {

            $q.then((res) => {
                const { accessToken, user } = res;
                return Promise.resolve(user);
            })
            .then(user => {
                Api.set('user', user);
                onLogin(user);
                resolve(user)
                //console.log('User', Api.get('user'));
                setTimeout( () => {
                    route.goto('universe');
                });
            })
            .catch((e: any) => {
                console.log(e)
                this.setState({phase: "IDLE"});
                Api.logout();
                reject(e);
                onError(e);
            });

        });
    }
    
    componentDidMount( ) {
        const $q = Api.reAuthenticate();
        
        this.afterJWT($q).then( (user: any) => {
        }).catch( (e) => {
        });
    }

    exec( text: string ) {
        const { onAlert } = this.props;
        this.setState({phase: "EXEC"});
        text = text.toLowerCase();
        const $q = Api.authenticate({
            "strategy": "local",
            "username": text,
            "password":  text
        });
        this.afterJWT($q).then( (user: any) => {
            if (onAlert) onAlert({type: 'success', text: `Ciao ${user.name}`})
        }).catch( (e) => {
            if (onAlert) onAlert({type: 'error', text: `La password non è giusta`})
        });
    }

    render() {
        const { phase } = this.state;

        const authProps = {
            phase,
            alert,
            onAttempt: (text: string) => {
                this.exec(text);
            }
        }

        return <Auth {...authProps} />
    }
}

const container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Container);

export default container;
