import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf, addDecorator } from '@storybook/react';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';

import Planet, { TYPES } from '../Planet/Planet';
import Universe, { Size } from './Universe';
import { randomInRange } from '../utils';

storiesOf('Galaxy', module)
//.addDecorator(withPixi)
// @ts-ignore
.add('Universe', ({app}) => {
    const planets = TYPES.map( ({name: t}) => ({
        name: t,
        type: t,
        pos: {
            x: randomInRange(0, Size.width),
            y: randomInRange(0, Size.height),
        }
    }));
    return <Universe app={app} planets={planets} />
});