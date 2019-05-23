import React from 'react';
import { Stage, AppConsumer } from '@inlet/react-pixi'

import { get } from '../../services/Config'
import Scrollable from '../Fundamentals/Scrollable'
import Space from './Space';
import Planet from '../Planet/Planet';
import Rocket from '../Rocket/Rocket';

interface Props {
  app?: any;
  planets?: any;
  visiting?: any;
  onInit?: Function;
  onGoto?: Function;
}

interface State {
  id?: any;
  pos?: any;
}

export const Size = {
  width: 6000,
  height: 6000
}

class Universe extends React.Component<Props, State> {
  state = {
  } as State;

  componentWillMount() {
    const { onInit } = this.props;
    if (onInit) {
      onInit();
    }
  }

  componentWillReceiveProps( nextProps: Props ) {
    if (nextProps.planets != this.props.planets) {
      var pos = { x: get('width')/2, y: get('height')/2 };
      // it means it's loaded
      if (nextProps.visiting) {
        const found = nextProps.planets.filter( (p: any) => p.id === nextProps.visiting );
        if (found.length > 0) {
          pos = found[0].pos;
        }
      }
      this.setState({
        pos
      });
    }
  }

  planetSelect( planet: any ) {
    this.setState({
      id: planet.id,
      pos: planet.pos
    });
  }

  render() {
    const { app, planets, onGoto } = this.props;
    const { id, pos } = this.state;

    if (!planets) return null;

    const scrollableProps = {
      onClick: ((pos: any) => {
        this.setState({
          pos
        });
      })
    }

    const rocketProps = {
      app,
      ...pos,
      land: !!id,
      onStop: () => {
        if (onGoto && id) {
          onGoto( id );
        }
      }
    }
    
    return (
      <Stage {...get('full')}>
        <AppConsumer>
        {app => (
        <>
        <Scrollable app={app} {...scrollableProps}>
          <Space size={Size} />
          {planets.map( (planet: any, k: number) => {
            const { id, name, pos, type } = planet;
            const { x, y, z = 1 } = pos;
            const planetProps = {
              key: k,
              app, x, y, z, name, type,
              onSelect: () => {
                this.planetSelect(planet);
              }
            };
            return <Planet {...planetProps} />
          })}
          {pos &&
          <Rocket {...rocketProps} />
          }
        </Scrollable>
        </>
        )}
        </AppConsumer>
      </Stage>
    );
  }
}

export default Universe;