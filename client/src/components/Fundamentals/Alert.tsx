import * as React from 'react';
import { classNames } from '../utils';

import "./Alert.scss";

interface Props {
    text: string;
    onDismiss: Function;
}

class Alert extends React.Component<Props> {
    render() {
        const { text, onDismiss } = this.props;
        return (
        <div className={classNames("Alert")} onClick={() => { if (onDismiss) onDismiss() } }>
            <div className="content">
                <p>{text}</p>
            </div>
        </div>
        );
    }
}
export default Alert;