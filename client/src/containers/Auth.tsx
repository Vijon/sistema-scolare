import * as React from "react";
import { connect } from "react-redux";
import { setError, setAuthentication, forgetAuthentication } from "../store/actions/app";
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
        }
    };
};

interface Props {
    onLogin: Function;
    onError: Function;
}

class Container extends React.Component<Props> {

    private afterJWT( $q: Promise<any> ) {
        const { onLogin, onError } = this.props;

        return new Promise( (resolve, reject) => {

            $q.then((res) => {
                //console.log('Authenticated!', res);
                return Api.passport.verifyJWT(res.accessToken);
            })
            .then(payload => {
                //console.log('JWT Payload', payload);
                return Api.service('users').get(payload.userId);
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
                onError(e);
            });

        });
    }
    
    componentDidMount( ) {
        const $q = Api.authenticate()
        
        this.afterJWT($q);
    }

    exec( text: string ) {
        const $q = Api.authenticate({
            "strategy": "local",
            "username": text,
            "password":  text
        });
        this.afterJWT($q).then( (user: any) => {
            alert(`Ben arrivato ${user.name}`);
        });
    }

    render() {
        const { onLogin } = this.props;

        const authProps = {
            onAttempt: (text: string) => {
                this.exec(text);
            }
        }

        return <Auth {...authProps} />
    }
}

const container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Container);

export default container;
