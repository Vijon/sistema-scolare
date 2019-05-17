import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';

import Planet, { TYPES } from './Planet';

storiesOf('Galaxy', module)
.addDecorator(withPixi)
// @ts-ignore
.add('Planet', ({app}) => {
    const Props = {
        app,
        x: 400,
        y: 200,
        name: text('name', 'Pianeta X'),
        type: select('type', TYPES.map( t => t.name ), TYPES[0].name)
    };
    return <Planet {...Props} /> 
});