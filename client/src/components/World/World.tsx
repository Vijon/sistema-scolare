import React from 'react';
import { Stage, AppConsumer } from '@inlet/react-pixi'
import Scrollable from '../Fundamentals/Scrollable'
import Area, { Size } from './Area'
import Toolbar from './Toolbar'
import Message from '../Message/Message'
import Marker from '../Message/Marker'

interface Props {
  name: string;
  map?: any;
  messages?: any;
  onAddMessage?: Function;
}

interface State {
  map?: any;
  pos?: any;
  currentTile?: string;
  currentMessage?: any;
  toolbarOpen: boolean;
}

class World extends React.Component<Props, State> {
  state = {
    map: this.props.map,
    toolbarOpen: false,
  } as State;

  onInit(map: any) {
    this.setState({map})
  }

  onAddMessage(msg: any) {
    const { onAddMessage } = this.props;
    const { pos } = this.state;
    if (onAddMessage) {
        onAddMessage({
          text: msg,
          ...pos
        });
    }
    this.setState({toolbarOpen: false});
  }

  onMove(x: number, y: number, pos: any) {
    this.setState({
      pos: { x, y, tx: pos.tpos.x, ty: pos.tpos.y }
    });
  }

  render() {
    const { name, messages = [] } = this.props;
    const { map, currentTile, currentMessage, toolbarOpen, pos } = this.state;

    const toolbarProps = {
      name,
      open: toolbarOpen,
      onAdd: (msg: string) => { this.onAddMessage(msg); },
      onOpen: () => { this.setState({toolbarOpen: true}) },
      onCancel: () => { this.setState({toolbarOpen: false}) }
    }
    const areaProps = {
      map,
      messages,
      mode: "MOVE" as any,
      tilePath: currentTile,
      onInit: (map: any) => this.onInit(map),
      onMove: (x: number, y: number, pos: any) => this.onMove(x, y, pos)
    }
    
    return <>
      {pos &&
      <Toolbar {...toolbarProps} />
      }
      <Stage {...Size}>
        <AppConsumer>{app => {
          const props = { app, ...areaProps };
          return (
            <>
              <Area {...props}>
              {messages.map( (message: any, k: number) => {
                const markerProps = {
                  key: k,
                  ...message,
                  onOpen: () => {
                    this.setState({
                      currentMessage: message
                    });
                  }
                }
                return <Marker {...markerProps} />
              })}
              </Area>
            </>
          )
        } }
        </AppConsumer>
      </Stage>
      {currentMessage && (
        <Message
          {...currentMessage}
          onClose={() => this.setState({
            currentMessage: null
          })} />
      )}
    </>
  }
}

export default World;