import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import { number, text } from '@storybook/addon-knobs';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';

import Nav from './Nav';

storiesOf('Interface', module)
// @ts-ignore
.add('Nav', ({app}) => {
    const Props = {
    }
    return <Nav {...Props} />;
});