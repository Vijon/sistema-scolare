import React from 'react';
import { Stage, AppConsumer } from '@inlet/react-pixi'

import SpeechToText from '../Fundamentals/SpeechToText'
import Space, { Size } from '../Universe/Space'
import { shuffleArray } from '../utils';

import "./Gate.scss";
 
interface Props {
    user: any;
    target: any;
    text: any;
    onAttempt?: Function;
}

interface State {
    step: "SALUTE" | "INTRO" | "QUIZ",
    answer: string,
    clueIndex: number;
}

class Gate extends React.Component<Props, State> {
  state = {
      step: "SALUTE",
      answer: '',
      clueIndex: 0
  } as State;

  $clues = shuffleArray(this.props.text.clues);

  nextStep() {
    if (this.state.step === "SALUTE") {
        this.setState({step: "INTRO"})
    }
    if (this.state.step === "INTRO") {
        this.setState({step: "QUIZ"})

        setInterval( () => {
            this.setState({clueIndex: this.state.clueIndex+1})
        }, 8000)
    }
  }

  handleChange( val: string ) {
    this.setState({
      answer: val
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
        const { user, target, text } = this.props;
        const { step, answer, clueIndex } = this.state;

        var txt;
        if (step === "SALUTE") {
            txt = text.salute;
        }
        if (step === "INTRO") {
            txt = text.intro;
        }
        if (step === "QUIZ") {
            txt = this.$clues[clueIndex]
        }
        return (
            <section className="Gate">
                <div className="content">
                    <header>
                        <img src={require('./assets/unknown.png')} />
                    </header>
                    <p>
                        {txt}
                    </p>
                    <footer>
                        {step !== "QUIZ" &&
                        // @ts-ignore
                        <button onClick={() => this.nextStep()}>{text[step === "SALUTE" ? "salute_btn" : "intro_btn"]}</button>
                        }
                        {step === "QUIZ" &&
                        <>
                            <input type="text" value={answer} placeholder="Come mi chiamo?" onChange={(e) => { this.handleChange(e.target.value); } } />
                            <button onClick={() => { this.submit(answer); } }>Ok</button>
                        </>
                        }
                    </footer>
                </div>
                <div className="bg">
                    <Stage {...Size}>
                        <AppConsumer>{app => <Space app={app} />}</AppConsumer>
                    </Stage>
                </div>
            </section>
        );
  }
}

export default Gate;