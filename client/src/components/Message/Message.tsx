import React from 'react';
import ReactDOM from 'react-dom';

import "./Message.scss";

interface MessageProps {
  text: string;
  sender: string;
  onClose: Function;
}

interface MessageState {
}

class Message extends React.Component<MessageProps, MessageState> {
  
  render() {
    const { text, sender, onClose } = this.props;
    return (<div className="Message" onClick={() => onClose()}>
      <div>
        <h3>{sender}💬</h3>
        {text}
      </div>
    </div>);
  }
}

export default Message;