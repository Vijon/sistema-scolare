import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';

import Rocket, { Size } from './Rocket';

storiesOf('Galaxy', module)
.addDecorator(withPixi)
// @ts-ignore
.add('Rocket', ({app}) => {
    const Props = {
        x: number('x', 0),
        y: number('y', 0),
        z: number('z', 1),
    }
    return <Rocket {...Props} />;
});