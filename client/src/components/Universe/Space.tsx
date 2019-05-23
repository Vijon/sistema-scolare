import React from 'react';
import { TilingSprite } from '@inlet/react-pixi'

import { get } from '../../services/Config'

interface Props {
  app?: any;
  size?: any;
}

interface State {
}

export const Size = {
  width: get('width') as number,
  height: get('height') as number
}

class Space extends React.Component<Props, State> {

  render() {
    const { app, size } = this.props;
    
    const tiles = {
      image: require("./assets/bg.png"),
      width: (size || Size).width,
      height: (size || Size).height,
      tilePosition: {x: 0, y: 0} as any
    }
    return (
      <>
        <TilingSprite
          {...tiles}
        />
      </>
    );
  }
}

export default Space;