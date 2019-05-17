import React from 'react';
import * as PIXI from 'pixi.js'
import {Stage, AppConsumer } from '@inlet/react-pixi'
import addons, { makeDecorator } from '@storybook/addons';

export const withPixi = makeDecorator({
    name: 'withPixi',
    wrapper: (storyFn, context, {parameters}) => {
        const stageParams = {
            width: window.innerWidth,
            height: window.innerHeight,
            options: { backgroundColor: 0x01262a },
        }
        return <Stage {...stageParams}>
            <AppConsumer>{app => storyFn({...context, app} )}</AppConsumer>
        </Stage>
    }
})
