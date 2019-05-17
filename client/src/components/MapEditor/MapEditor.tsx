import React from 'react';
import { Stage, AppConsumer } from '@inlet/react-pixi'
import Scrollable from '../Fundamentals/Scrollable'
import Area, { Size } from '../World/Area'
import Toolbar from './Toolbar'

interface Props {
  map?: any;
  onAddTile?: Function;
  onMapUpdate?: Function;
}

interface State {
  map?: any;
  currentTile?: string;
  toolbarOpen: boolean;
  mode?: "MOVE" | "DRAW";
}

export interface NewTile {
  scope: string;
  key: string;
  tile: string;
}

class MapEditor extends React.Component<Props, State> {
  state = {
    map: this.props.map || {},
    toolbarOpen: false
  } as State;

  onInit(map: any) {
    this.setState({map})
  }

  onAddTile(args: NewTile) {
    const { onAddTile } = this.props;
    if (onAddTile) {
      onAddTile(args);
    }
  }

  onMove(x: number, y: number) {
    if (this.state.mode === "DRAW") {
      // start draw
      this.addTile( x, y );
    } else {
      // idle
    }
  }

  addTile( x: number, y: number ) {
    const { onAddTile, onMapUpdate } = this.props;
    let { map, currentTile } = this.state;
    if (!currentTile) return;
    const [scope, tile] = currentTile.split('.');
    const col = Math.floor(x / Size.tile);
    const row = Math.floor(y / Size.tile);
    if (typeof map[scope] === "undefined") { map[scope] = {}; }
    const current = map[scope][`${col}:${row}`] || null;
    if (current !== currentTile) {
      const key = `${col}:${row}`;
      if (!map) map = {};
      if (!map[scope]) map[scope] = {};
      map[scope][key] = currentTile;
      this.setState({map});
      if (onAddTile) {
        onAddTile({
          scope,
          key,
          tile: currentTile
        } as NewTile)
      }
      if (onMapUpdate) {
        onMapUpdate(map);
      }
    }
  }

  render() {
    const { map, currentTile, toolbarOpen, mode = "MOVE" } = this.state;

    const toolbarProps = {
      mode,
      open: toolbarOpen,
      onSelect: (tile: string) => { this.setState({currentTile: tile, toolbarOpen: false}) },
      onOpen: () => { this.setState({mode: "DRAW", toolbarOpen: true}) },
      onStop: () => { this.setState({mode: "MOVE"}); },
      onCancel: () => { this.setState({mode: !currentTile ? "MOVE" : mode, toolbarOpen: false}) }
    }
    const areaProps = {
      mode,
      map,
      tilePath: currentTile,
      onInit: (map: any) => this.onInit(map),
      onMove: (x: number, y: number) => this.onMove(x, y)
    }
    return <>
      <Toolbar {...toolbarProps} />
      <Stage {...Size}>
        <AppConsumer>{app => { const props = { app, ...areaProps }; return <Area {...props} />; } }</AppConsumer>
      </Stage>
    </>
  }
}

export default MapEditor;