import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';

import Splash from './Splash';

storiesOf('Interface', module)
//.addDecorator(withPixi)
// @ts-ignore
.add('Splash', ({app}) => {
    const Props = {
        app
    }
    return <Splash {...Props} />;
});