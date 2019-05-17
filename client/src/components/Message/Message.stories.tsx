import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import { number, text } from '@storybook/addon-knobs';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';

import Message from './Message';
import Marker, { Size } from './Marker';

storiesOf('World', module)
.addDecorator(withPixi)
// @ts-ignore
.add('Message', ({app}) => {
    const Props = {
        text: text('text', 'prova'),
        position: {
            x: number('x', 0),
            y: number('y', 0),
            z: number('z', 1),
        }
    }
    return <Marker {...Props} />;
});