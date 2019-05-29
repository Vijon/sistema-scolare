import * as React from 'react';
// @ts-ignore
import SpeechToText from 'speech-to-text';
import Idle from '../Fundamentals/Idle'
import { classNames } from '../utils';

interface Props {
    text: {
        start: string,
        stop: string
    };
    onStart?: Function;
    onText?: Function;
    onComplete?: Function;
    onError?: Function;
}

interface State {
    listening: boolean;
    error: string;
    interimText: string;
    finalisedText: string[];
}

class SpeechToTextCpt extends React.Component<Props, State> {
    state = {
        listening: false
    } as State;

    listener: any;
    componentDidMount() {
        const { onText, onComplete, onError } = this.props;
        const onAnythingSaid = (text: string) => {
            this.setState({
                interimText: text
            }, () => {
                if (onText) {
                    onText(text)
                }
            });
        };
    
        const onEndEvent = () => {
            /*if (this.state.listening) {
                this.listener.startListening();
            }*/
            this.setState({
                listening: false
            });
        };
    
        const onFinalised = (text: string) => {
            const parts = [text, ...this.state.finalisedText || []];
            this.setState({
                //finalisedText: parts,
                interimText: '',
                listening: false
            }, () => {
                if (onComplete) {
                    onComplete(parts.join(' '))
                }
            });
        };
    
        try {
            this.listener = new SpeechToText(onFinalised, onEndEvent, onAnythingSaid, 'it-IT');
        } catch (error) {
            this.setState({ error: error.message });
            if (onError) {
                onError(error.message)
            }
        }
    }

    listen() {
        const { onStart } = this.props;
        this.setState({
            listening: true
        }, () => {
          this.listener.startListening();
          if (onStart) {
              onStart();
          }
        })
    }
  
    stop() {
        const { onComplete } = this.props;
        this.setState({
            listening: false
        }, () => {
            this.listener.stopListening();
            if (onComplete) {
                onComplete();
            }
        })
    }

    render() {
        const { text } = this.props;
        return (
            <>
                <Idle fast={this.state.listening} />
                <footer className="speechToTextToolbar">
                    {this.state.listening && (
                        <button onClick={() => this.stop()}><span className="icon-speak" /> {text.stop}</button>
                    )}
                    {!this.state.listening && (
                        <button onClick={() => this.listen()}><span className="icon-hand" /> {text.start}</button>
                    )}
                </footer>
            </>
        );
    }
}
export default SpeechToTextCpt;