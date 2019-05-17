import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf, addDecorator } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Toolbar from './Toolbar';

storiesOf('Editor', module)
// @ts-ignore
.add('Toolbar', ({app}) => {
    const Props = {
        open: boolean('open', false),
        onSelect: () => {
            console.log('selected tile')
        }
    };
    return <Toolbar {...Props} /> 
});