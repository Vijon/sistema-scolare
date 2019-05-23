import React from 'react';
import { Stage, AppConsumer, Container, Text } from '@inlet/react-pixi'

import { get, loadWebFonts, textStyle } from '../../services/Config'
import Space, { Size } from '../Universe/Space'
import Planet from '../Planet/Planet';

import "./Splash.scss";
 
interface Props {
    app?: any;
    onDismiss?: Function;
}

interface State {
    loading?: boolean;
}

class Splash extends React.Component<Props, State> {
    state = {
        loading: true
    } as State;

    async componentWillMount() {
        await loadWebFonts();
        this.setState({loading: false});
    }

    render() {
        const { app, onDismiss } = this.props;
        const { loading = false } = this.state;
        if (loading) { return null; }
        const sizeProps = {
            width: Size.width,
            height: Size.height,
        }
        const centeredProps = {
            x: Size.width/2,
            y: Size.height/2,
            anchor: 0.5,
        };
        const subTextProps = {
            style: textStyle({
                fontSize: 30,
                fill: '#ff0000',
                stroke: null,
                align: 'center',
            }),
            text: `Alla scoperta del`,
            anchor: 0.5,
            x: Size.width/2,
            y: Size.height/2 - 100,
        }
        const textProps = {
            style: textStyle({
                fontSize: 80,
                align: 'center',
            }),
            text: `SISTEMA SCOLARE`,
            anchor: 0.5,
        }
        return (
            <Stage {...get('full')}>
                <AppConsumer>
                {app => (
                <>
                <Space app={app} />
                <Container
                    {...sizeProps}
                    interactive={true}
                    pointerdown={() => { if (onDismiss) onDismiss(); }}
                >
                    <Text {...subTextProps} />
                    <Text {...textProps} {...centeredProps} />
                </Container>
                </>
                )}
                </AppConsumer>
            </Stage>
        );
    }
}

export default Splash;