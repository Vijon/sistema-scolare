import React from 'react';
import { Container, Sprite } from '@inlet/react-pixi'
import { Size as TileSize, getRealPos } from '../World/Tileset';

export const Size = {
  width: 110,
  height: 246
}


interface Props {
    app?: any;
    type?: string;
    text: string;
    position: {
        x: number,
        y: number,
    };
    onOpen?: Function;
}

interface State {
    open: boolean;
}

class Marker extends React.Component<Props, State> {
    state = {
      open: false
    };
  
    // private
    $sprite: any;
    render() {
      const { type = "balloon", onOpen, position } = this.props;
      const { open } = this.state;
  
      const spriteProps = {
        image: require(`./assets/${type}.png`),
        width: TileSize.side,
        height: TileSize.side,
        anchor: 0,
        interactive: true,
        pointerdown: () => { if (onOpen) { onOpen(); } this.setState({open: true}) }
      }
      return (
        <Container {...getRealPos(position)}>
          <Sprite ref={s => this.$sprite = s} {...spriteProps} />
        </Container>
      );
    }
  }

  export default Marker;