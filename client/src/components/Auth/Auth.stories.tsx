import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';
import { withRedux } from '../../../.storybook/addon-redux/src/index';

import Auth from '../../components/Auth/Auth';

storiesOf('Interface', module)
// @ts-ignore
.add('Auth', ({app}) => {
    const Props = {
        phase: "IDLE"
    }
    return <Auth {...Props} />;
});