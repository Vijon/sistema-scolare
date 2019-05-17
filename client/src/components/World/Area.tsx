import React from 'react';
import { Container, Sprite, Text } from '@inlet/react-pixi'
import Scrollable from '../Fundamentals/Scrollable'
import { get } from '../../services/Config'
import * as Tileset from '../World/Tileset'

interface Props {
  app?: any;
  map?: any;
  cols?: number;
  rows?: number;
  defaultTile?: string;
  tilePath?: string;
  mode?: "MOVE" | "DRAW";
  onInit?: Function;
  onMove?: Function;
}

interface State {
  loading?: boolean;
}

export const Size = {
  width: get('width') as number,
  height: get('height') as number,
  tile: Tileset.Size.side
}

const COLS = 40;
const ROWS = 40;
const BASE_TILE = "ground.base";

var $pos: any;
var $cursor: any;
class Area extends React.Component<Props, State> {
  state = {
    loading: true,
  } as State;

  componentDidMount() {
    Tileset.load().then( () => {
      this.initialBuild();
    })
  }

  initialBuild() {
    const { map, onInit } = this.props;
    
    if (onInit) {
      onInit(map);
    }
    this.setState({loading: false});
  }

  build() {
    const { map, cols = COLS, rows = ROWS } = this.props;
    const { } = this.state;
    if (!map) { return []; }
    let scopes = Object.keys(map);
    if (!scopes.length) scopes = ['ground'];
    var $map = [] as any;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        scopes.forEach( scope => {
          let tile;
          if (map && map[scope]) {
            tile = map[scope][`${c}:${r}`];
          }
          if (!tile) { if (scope === "ground") tile = BASE_TILE; else return; };
          $map.push( { col: c, row: r, tile } );
        })
      }
    }
    return $map;
  }

  onMove( x: number, y: number ) {
    const { onMove } = this.props;

    const currentPos = this.moveCursor(x,y)
    if (onMove) {
      onMove(x,y, currentPos);
    }
  }

  moveCursor( x: number, y: number ) {
    $pos = {x,y};
    const tpos = Tileset.getTilePos($pos)
    $cursor.x = tpos.x * Size.tile;
    $cursor.y = tpos.y * Size.tile;
    $cursor.visible = true;

    return { ...$pos, tpos };
  }

  render() {
    const { app, mode, children } = this.props;
    const { loading } = this.state;
    if (loading) return null;

    const scrollableProps = {
      app,
      onMoveStart: (e: any) => {
        this.onMove(e.x, e.y);
      },
      onMove: (e: any) => {
        this.onMove(e.x, e.y);
      },
      disabled: mode !== "MOVE"
    }

    let cursorProps;
    cursorProps = {
      visible: false,
      image: require('./cursor.png'),
      width: Size.tile,
      height: Size.tile,
    }

    const TextStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 10,
      fill: '#ffffff',
    });

    return <Scrollable {...scrollableProps}>
      {this.build().map( (cell: any, i: number) => {
        const containerProps = {
            key: i,
            anchor: 0,
        }
        const spriteProps = {
            texture: Tileset.tile(cell.tile).texture, // this.getTile(cell)
            width: Size.tile,
            height: Size.tile,
            x: cell.col * Size.tile,
            y: cell.row * Size.tile,
        }
        const debug = false;
        return <Container {...containerProps}>
          <Sprite {...spriteProps} />
          {debug && <Text key={'t_' + i} style={TextStyle} x={spriteProps.x} y={spriteProps.y} text={`${cell.col} x ${cell.row}`} />}
        </Container>
      } )}
      {children}
      <Sprite ref={s => $cursor = s} {...cursorProps} />
    </Scrollable>;
  }
}

export default Area;