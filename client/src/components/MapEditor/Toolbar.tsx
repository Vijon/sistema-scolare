import React from 'react';
import * as Tileset from '../World/Tileset'

import "./Toolbar.scss";

interface Props {
  open?: boolean;
  onOpen?: Function;
  onStop?: Function;
  onSelect?: Function;
  onCancel?: Function;
  mode?: "MOVE" | "DRAW";
}

interface State {
  loading: boolean;
  selected?: string;
  scope?: string;
}

class Toolbar extends React.Component<Props, State> {
  state = {
    loading: true,
  } as State;

  componentDidMount() {
    Tileset.load().then( () => {
      this.setState({
        loading: false,
        scope: Tileset.scopes()[0].key, // default is first
      })
    });
  }

  selectScope(scope: string) {
    this.setState({
      scope: scope
    });
  }

  selectTile(scope: string, tile: string) {
    const { onSelect } = this.props;
    const { selected } = this.state;
    const tileKey = `${scope}.${tile}`;
    // change selection
    this.setState({
      selected: tileKey
    });
    // callback
    if (onSelect) {
      onSelect(tileKey);
    }
  }

  render() {
    const { open = false, onOpen, onStop, onCancel, mode = "MOVE" } = this.props;
    const { loading, selected, scope } = this.state;
    if (loading) return null;
    const scopes = Tileset.scopes();

    if (!open) {
      return <div className={`ToolbarReduced ${mode}`}>
        {mode === "MOVE" && <button onClick={() => { if (onOpen) onOpen() } }><span className="icon-build" /> Scegli blocco</button>}
        {mode === "DRAW" && <><button onClick={() => { if (onOpen) onOpen() } }><span className="icon-build" /> Altro blocco</button><button className="success" onClick={() => { if (onStop) onStop() } }><span className="icon-hand" /> Fatto?</button></>}
      </div>
    }

    return (<div className="Toolbar">
      <nav onClick={() => { if (onCancel) onCancel() } }><span className="icon-close" /></nav>
      <header>
        {scopes.map( (s, i) => (
        <span key={i} className={s.key === scope ? 'ScopeActive' : ''} onClick={() => this.selectScope(s.key)}><span className={`icon-${s.key}`} /></span>
        ))}
      </header>
      {scopes.map( (s, i) => s.key === scope && (
      <section key={i}>
        <div>
        {s.sheet.map( (tile: any, i: number) => (
          <figure key={i} className={selected === tile.path ? "TileActive" : "" } onClick={() => { this.selectTile(s.key, tile.key)  } }>
            <div className={tile.key} />
          </figure>
        ))}
        </div>
      </section>
      ))}
    </div>)
  }
}

export default Toolbar;