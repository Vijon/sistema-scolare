import React from 'react';
import { Container, Sprite } from '@inlet/react-pixi'
import { TweenMax, Circ } from "gsap";
require('gsap/PixiPlugin');
import { isEqual, angleBetweenPoints, distanceBetweenPoints } from '../utils';
 
interface Props {
  app?: any;
  x: number;
  y: number;
  z?: number;
  onStop?: Function;
}

interface State {
  throttle: boolean;
}

export const Size = {
  width: 110/2,
  height: 246/2
}

const AnimationSpeed = {
  total: .005,
  fade: .001
};

class Rocket extends React.Component<Props, State> {
  state = {
    throttle: false
  };

  // private
  $sprite: any;
  
  componentDidMount() {
    const { x, y } = this.props;
    if (!this.$sprite) return;
    TweenMax.set(this.$sprite, {
      pixi: { 
        x,
        y,
        scale: .2
      }
    } );
  }

  componentWillReceiveProps( nextProps: Props ) {
    if (this.props.x === undefined) return;
    if (!isEqual(nextProps, this.props)) {
      const { x, y, z = 1, onStop } = nextProps;
      const rotation = angleBetweenPoints(this.props, nextProps);
      const distance = distanceBetweenPoints(this.props, nextProps);
      this.setState({ throttle: true })
      TweenMax.to(this.$sprite, distance * AnimationSpeed.fade, {
        pixi: {
          scale: .5,
        }
      });
      TweenMax.to(this.$sprite, distance * AnimationSpeed.fade, {
        pixi: {
          scale: .2,
        }
      }).delay(distance * AnimationSpeed.total - distance * AnimationSpeed.fade);
      TweenMax.to(this.$sprite, distance * AnimationSpeed.total, {
        pixi: { 
          x, 
          y,
          rotation: 90 + rotation.degrees
        },
        ease: Circ.easeOut,
        onComplete: () => {
          this.setState({ throttle: false });
          if (onStop) onStop();
        }
      } );
    }
  }

  render() {
    const containerProps = {
      pivot: {
        x: 0, //Size.width / 2,
        y: 0
      } as PIXI.Point
    }
    const spriteProps = {
      ...Size,
      anchor: [.5, 0] as any,
      image: require(`./pixel_${this.state.throttle ? 'on' : 'off'}.png`),
    }
    return (
      <Container {...containerProps} >
        <Sprite ref={s => { this.$sprite = s; }} {...spriteProps} />
      </Container>
    );
  }
}

export default Rocket;