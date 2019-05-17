import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf, addDecorator } from '@storybook/react';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';

import Universe, { Size } from './Universe';

storiesOf('Galaxy', module)
//.addDecorator(withPixi)
// @ts-ignore
.add('Universe', ({app}) => {
    return <Universe app={app} />
});