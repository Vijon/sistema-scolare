import * as React from "react";
import { connect } from "react-redux";
import { setAlert, setError, setCurrent } from "../store/actions/app";
import Api from "../services/Api";
import World from "../components/World/World";
import Gate from "../components/Gate/Gate";
import { mergeProps } from "./helpers";

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        target: state.current
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onInit: (item: any) => {
            dispatch(setCurrent(item));
        },
        onUnlock: (item: any) => {
            //dispatch(setCurrent(item));
        },
        onAlert: (msg: any) => {
            dispatch(setAlert(msg));
        }
    };
};

interface Props {
    id: any;
    user: any;
    target: any;
    onInit: Function;
    onUnlock: Function;
    onAddMessage: Function;
    onAlert: Function;
}

class Container extends React.Component<Props> {

    componentDidMount( ) {
        const { id } = this.props;
        this.loadTarget(id);
    }

    loadTarget(id: any) {
        const { onInit } = this.props;
        Api.service('users').get(id)
        .then((res) => {
            Api.service('messages').find({
                query: {
                    target_id: id
                }
            })
            .then((res2) => {
                res.messages = res2;
                onInit(res);
            });
        })
        .catch((e: any) => {
        });
    }
    
    tryToUnlock( answer: string ) {
        const { id, onUnlock, onAlert } = this.props;
        Api.service(`users/${id}/unlock`).find({
            query: {
                name: answer
            }
        })
        .then((res) => {
            this.loadTarget(id);
            onUnlock(res);
            if (onAlert) onAlert({type: 'success', text: `Hai sbloccato il pianeta di ${answer}!`})
        })
        .catch((e: any) => {
            if (onAlert) onAlert({type: 'error', text: `Non è ${answer}`})
        });
    }

    addNewMessage( args: any ) {
        const { id, onAddMessage } = this.props;
        const { text, tx, ty } = args;
        
        Api.service('messages').create({
            target_id: id,
            text,
            position: {
                x: tx, y: ty
            }
        })
        .then((res) => {
            this.loadTarget(id);
            onAddMessage(res);
        })
        .catch((e: any) => {
        });
    }

    render() {
        const { user, target } = this.props;
        if (!target) return null;
        if (target.canView) {
            const worldProps = {
                ...this.props,
                name: target.name,
                map: target.world.map,
                messages: target.messages,
                onAddMessage: (args: any) => {
                    this.addNewMessage(args);
                }
            }
            return <World {...worldProps} />
        } else {
            const gateProps = {
                ...this.props,
                user,
                target: target.gate,
                text: target.text,
                onAttempt: (answer: string) => this.tryToUnlock(answer)
            }
            return <Gate {...gateProps} />
        }
    }
}

const container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Container);

export default container;

            