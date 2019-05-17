import * as React from 'react';
import { classNames } from '../utils';

import "./Popup.scss";

interface Props {
    title?: string;
    text: string;
    onCancel?: Function;
}

class Popup extends React.Component<Props> {
    render() {
        const { title, text, onCancel } = this.props;
        return (
        <div className={classNames("Popup")}>
            <nav onClick={() => { if (onCancel) onCancel() } }><span className="icon-close" /></nav>
            <div className="content">
                {title &&
                <h2>{title}</h2>
                }
                <p>{text}</p>
            </div>
        </div>
        );
    }
}
export default Popup;