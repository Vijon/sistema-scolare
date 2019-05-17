import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf, addDecorator } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';

import Area, { Size } from './Area';

const sampleMap = require('./Area.stories.json');

storiesOf('World', module)
.addDecorator(withPixi)
// @ts-ignore
.add('Area', ({app}) => {
    const Props = {
        app,
        map: sampleMap,
        tilePath: 'ground.generic-rpg-tile-waterfall02'
    };
    return <Area {...Props} /> 
});