import * as React from 'react';
import { classNames } from '../utils';

import "./Nav.scss";

interface Props {
    onClick?: Function;
}

class Nav extends React.Component<Props> {
    render() {
        const { onClick } = this.props;

        return (
        <nav className={classNames("Nav")}>
            {/*<div className="logo">
                <img src={require('./assets/logo.png')} />
            </div>*/}
            <div onClick={() => { if (onClick) { onClick('editor'); } }}>
                <span className="icon-planet" /> 
                Il mio pianeta
            </div>
            <div onClick={() => { if (onClick) { onClick('universe'); } }}>
                <span className="icon-rocket" /> 
                Esplora
            </div>
        </nav>
        );
    }
}
export default Nav;