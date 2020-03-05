import React from 'react';
import { storiesOf } from '@storybook/react';

import Auth from '../../components/Auth/Auth';

storiesOf('Interface', module)
// @ts-ignore
.add('Auth', ({app}) => {
    const Props = {
        phase: "IDLE"
    }
    return <Auth {...Props} />;
});