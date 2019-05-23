import * as React from 'react';
import { initAddToHome, addToHome } from '../../services/PWA';
import "./AddHome.scss";

interface Props {}

interface State {
    // tslint:disable-next-line:no-any
    event?: any;
    over?: boolean;
    active?: boolean;
    dismissed?: boolean;
}

class AddHome extends React.Component<Props, State> {
    state = {
        over: false,
        active: false,
        dismissed: false
    } as State;

    componentDidMount() {
        initAddToHome().then( () => {
            this.setState({
                active: true
            });
        });
    }

    over() {
        this.setState({
            over: true
        });
        setTimeout(() => {
            this.setState({
                over: false
            });
        }, 700);
    }

    execute() {
        addToHome().then( () => {
            this.setState({
                active: false
            });
        }, () => {
            this.setState({
                dismissed: true
            });
        });
    }

    render() {
        const { over, active, dismissed } = this.state;
        if (!active || dismissed) { return null; }
        return (
        <button
            className={`AddHome ${over ? 'animate' : null}`}
            onClick={() => this.execute()}
            onMouseOver={() => this.over()}
        >
            Installalo sul telefonino!
        </button>
        );
    }
}
export default AddHome;