import React from 'react';
import { Stage, AppConsumer } from '@inlet/react-pixi'

import { get } from '../../services/Config'
import SpeechToText from '../Fundamentals/SpeechToText'
import Space, { Size } from '../Universe/Space'
import "./Auth.scss";
 
interface Props {
    phase: string;
    onAttempt?: Function;
}

interface State {
    password: string
}

class Auth extends React.Component<Props, State> {
  state = {
  } as State;

  handleChange( val: string ) {
    this.setState({
      password: val
    })
  }

  submit( text?: string ) {
    const { onAttempt } = this.props;
    if (text && text.length > 0) {
        if (onAttempt) {
            onAttempt(text);
        }
    }
  }
  
  render() {
    const { phase } = this.props;
    const { password } = this.state;
    const s2tProps = {
        text: {
            start: 'Premi qui e pronuncia la password!',
            stop: 'Ok, ho detto la password.'
        },
        onComplete: (text?: string) => {
            if (text) {
                this.setState({password: text});
                this.submit(text);
            }
        }
    }
    return (
        <section className="Auth">
            <header>Chi sei?</header>
            <SpeechToText {...s2tProps} />
            <nav>
                <input type="text" placeholder="Oppure digita qui" value={password} onChange={(e) => { this.handleChange(e.target.value); } } />
                <button onClick={() => this.submit(password)}>
                    {phase === "IDLE" && <span>OK</span>}
                    {phase === "EXEC" && <span>Cercando...</span>}
                </button>
            </nav>
            <div className="bg">
                <Stage {...get('full')}>
                    <AppConsumer>{app => <Space app={app} />}</AppConsumer>
                </Stage>
            </div>
        </section>
    );
  }
}

export default Auth;