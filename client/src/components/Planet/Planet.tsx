import React from 'react';
import { Container, Sprite, Text } from '@inlet/react-pixi'
import { loadWebFonts, textStyle } from '../../services/Config'

interface Props {
  app?: any;
  name?: string;
  type: string;
  x: number;
  y: number;
  z?: number;
  onSelect?: Function;
}

interface State {
  rotation: number;
}

export const Size = {
  width: 120,
  height: 120
}

export const TYPES = [
  { name: 'astrale' },
  { name: 'fosforosh' },
  { name: 'frogeye' },
  { name: 'icecream' },
  { name: 'marx' },
  { name: 'megalocs' },
  { name: 'moon' },
  { name: 'potato' },
  { name: 'inferno' },
  { name: 'rotten' },
  { name: 'slime' },
  { name: 'vulcano' },
];

class Planet extends React.Component<Props, State> {
  // private
  $sprite: any;
  $rotation = 0;

  state = { rotation: 0 }

  async componentWillMount() {
    await loadWebFonts();
  }

  componentDidMount() {
    this.props.app.ticker.add(this.tick)
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.tick)
  }

  tick = (delta: number) => {
    this.$rotation = this.$rotation + 0.01 * delta;
    this.$sprite.rotation = this.$rotation;
    /*
    this.setState(({ rotation }) => ({
      rotation: rotation + 0.01 * delta,
    }))
    */
  }

  render() {
    const { name, type, x, y, z = 1, onSelect } = this.props;

    const sprite = {
      image: require(`./assets/${type}.png`),
      anchor: .5,
      rotation: this.state.rotation,
      width: Size.width,
      height: Size.height,
      interactive: true,
      pointerdown: () => {
        if (onSelect) {
          onSelect()
        }
      }
    }
    
    return (
      <Container x={x} y={y}>
        <Sprite {...sprite} /*scale={z}*/ ref={s => this.$sprite = s} />
        {name &&
        <Text style={textStyle()} x={0} y={0} text={name} />
        }
      </Container>
    );
  }
}

export default Planet;