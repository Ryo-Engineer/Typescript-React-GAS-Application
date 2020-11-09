import React from 'react';

type Props = {
    onTextChange: React.ChangeEventHandler<HTMLElement>
    onButtonClick: React.MouseEventHandler<HTMLButtonElement>
}

const ChatBox: React.FC<Props> = props => {
    return (
        <div className="ChatBox">
            <textarea name='text' onChange={props.onTextChange}/>
            <button onClick={props.onButtonClick}>送信</button>
        </div>
    );
}

export default ChatBox;

