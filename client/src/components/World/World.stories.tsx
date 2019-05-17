import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf, addDecorator } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';

import World from './World';

const sampleMap = require('./Area.stories.json');
const sampleMessages = require('./Messages.stories.json');

storiesOf('World', module)
// @ts-ignore
.add('World', ({app}) => {
    const Props = {
        app,
        name: 'test',
        map: sampleMap,
        messages: sampleMessages,
        onAddMessage: (args: any) => {
            console.log(args)
        }
    };
    return <World {...Props} /> 
});