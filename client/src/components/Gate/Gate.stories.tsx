import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { withPixi } from '../../../.storybook/addon-pixi/src/index';

import Gate from './Gate';

storiesOf('Interface', module)
// @ts-ignore
.add('Gate', ({app}) => {
    const Props = {
        user: {
            name: text('user', 'Mauro')
        },
        target: {
            capelli: text('capelli', 'Biondi'),
            occhi: text('capelli', 'Biondi'),
            occhiali: boolean('occhiali', false),
            cibo: text('cibo', 'Biondi'),
            cartone: text('cartone', 'Biondi'),
            sport: text('sport', 'Biondi'),
            squadra: text('squadra', 'Biondi'),
            paura: text('paura', 'Biondi'),
            tempo_libero: text('tempo_libero', 'Biondi'),
            videogame: text('videogame', 'Biondi'),
            materia: text('materia', 'Biondi'),
            musica: text('musica', 'Biondi'),
            cosa_bella: text('cartone', 'Biondi'),
        },
        text: {
            salute: `Benvenuto sul mio pianeta.`,
            intro: `Se vuoi entrare nel mio pianeta devi scoprire chi sono!`,
            intro_btn: `OK!`,
            salute_btn: `Ciao!`,
            clues: [
                `1 Ho i capelli verdi`,
                `2 I mie occhi sono grigi`,
                `3 Ho gli occhiali`,
                `4 Impazzisco per la pizza`,
            ]
        }
    }
    return <Gate {...Props} />;
});