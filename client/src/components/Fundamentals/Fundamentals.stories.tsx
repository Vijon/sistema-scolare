import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';

import Popup from './Popup';

storiesOf('Interface', module)
// @ts-ignore
.add('Popup', ({app}) => {
    const Props = {
        title: text('title', 'Titolo popup'),
        text: text('text', 'Lorem ipsum ')
    }
    return <Popup {...Props} />;
});