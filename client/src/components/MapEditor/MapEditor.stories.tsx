import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf, addDecorator } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import MapEditor from './MapEditor';

storiesOf('Editor', module)
// @ts-ignore
.add('Editor', ({app}) => {
    const Props = {
        onAddTile: (args: any) => {
            console.log(args)
        },
        onMapUpdate: (map: any) => {
            console.log(JSON.stringify(map));
            console.log('---------------------')
        }
    };
    return <MapEditor {...Props} /> 
});