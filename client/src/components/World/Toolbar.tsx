import React from 'react';
import SpeechToText from '../Fundamentals/SpeechToText'

import "../MapEditor/Toolbar.scss";

interface Props {
  name: string;
  open?: boolean;
  onAdd?: Function;
  onOpen?: Function;
  onCancel?: Function;
}

interface State {
  text: string;
}

var $startText = "";
class Toolbar extends React.Component<Props, State> {
  state = {
    text: ''
  } as State;

  handleChange( val: string ) {
    this.setState({
      text: val
    })
  }

  reset() {
    this.setState({text: ""})
  }

  render() {
    const { name, open = false, onAdd, onOpen, onCancel } = this.props;
    const { text } = this.state;

    if (!open) {
      return <div className="ToolbarReduced">
        <button onClick={() => { if (onOpen) onOpen() } }><span className="icon-bubble" /> Lascia un messaggio a {name}</button>
      </div>
    }

    const s2tProps = {
        text: {
          start: 'Parla',
          stop: 'Ok, finito.'
        },
        onStart: () => {
          $startText = text;
        },
        onText: (val: string) => {
          this.setState({
            text: `${$startText} ${val}`
          })
        }
    }

    return (<div className="Toolbar">
      <nav onClick={() => { if (onCancel) onCancel(); this.reset();  } }><span className="icon-close" /></nav>
      <div className="message">
        <textarea value={text} onChange={(e) => { this.handleChange(e.target.value); } }></textarea>
      </div>
      <SpeechToText {...s2tProps} />
      {text && (
      <footer className="submit">
        <button onClick={() => { if (onAdd) onAdd(text); this.reset();}}><span className="icon-hand" /> Pianta il messaggio</button>
      </footer>
      )}
    </div>)
  }
}

export default Toolbar;