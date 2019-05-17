import * as React from 'react';
import { classNames } from '../utils';

import "./Idle.scss";

interface Props {
    fast?: boolean;
}

class Loading extends React.Component<Props> {
    render() {
        const { fast = false } = this.props;
        return (
        <div className={classNames("Idle", fast ? 'fast' : null)}>
            <div className="c">
                <div className="s" />
            </div>
        </div>
        );
    }
}
export default Loading;