import React from 'react';
import { Container, Sprite } from '@inlet/react-pixi'
import gsap from "gsap";
import { isEqual, angleBetweenPoints, distanceBetweenPoints } from '../utils';
 
interface Props {
  app?: any;
  x: number;
  y: number;
  z?: number;
  land?: boolean;
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
  $timeline: any = {};
  $init = false;
  
  componentDidMount() {
    if (!this.$sprite) return;
  }

  init() {
    if (this.$init) return;
    const { x, y } = this.props;
    gsap.set(this.$sprite, {
      pixi: { 
        x,
        y,
        scale: .5
      }
    } );
    this.$init = true;
  }

  componentWillReceiveProps( nextProps: Props ) {
    if (this.props.x === undefined) return;
    if (!isEqual(nextProps, this.props)) {
      if ((nextProps.x !== this.props.x) || (nextProps.y !== this.props.y)) {
        const { x, y, z = 1, onStop } = nextProps;
        const rotation = angleBetweenPoints(this.props, nextProps);
        const distance = distanceBetweenPoints(this.props, nextProps);
        this.setState({ throttle: true })
        console.log('launch ani', nextProps.land ? .2 : .5)
        // prepare animations
        gsap.to(this.$sprite, {
          duration: distance * AnimationSpeed.total,
          //delay: 0,
          pixi: {
            x, 
            y,
            rotation: 90 + rotation.degrees,
            scale: nextProps.land ? .2 : .5,
          },
          ease: "circ",
          onComplete: () => {
            console.log('complete')
            this.setState({ throttle: false });
            if (onStop) onStop();
          },
        });
      }
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
      //...Size,
      anchor: [.5, 0] as any,
      image: require(`./pixel_${this.state.throttle ? 'on' : 'off'}.png`),
    }
    return (
      <Container {...containerProps} >
        <Sprite ref={s => { this.$sprite = s; this.init(); }} {...spriteProps} />
      </Container>
    );
  }
}

export default Rocket;