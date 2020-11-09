import React, {useEffect, useState} from 'react';
import {firestore} from "../firebase";




import MessageList from "./MessageList";
import ChatBox from "./ChatBox";

import {userStateProps} from '../App'

import './Chat.css'

type MessageProps = {
    text: string,
    create_at: any,
    user_name: string,
    user_dep: string,
}

const Chat: React.FC<userStateProps> = (props) => {


    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [message, setMessage] = useState<MessageProps>({
        user_dep: '',
        user_name: '', text: '', create_at: ''
    });




    const onTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.name === 'text') {
            message.text = e.target.value;
        }
        setMessage(message);
    };

    const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (message.text === "") {
            alert('text empty')
            return
        }
        message.user_dep = props.department
        message.user_name = props.name
        message.create_at = new Date();
        firestore.collection('messages').add(message)
    };

    useEffect(() => {
        firestore.collection('messages').orderBy('create_at', 'desc').onSnapshot((docs) => {
            const messageList: MessageProps[] = [];
            docs.forEach(doc => {
                messageList.push(doc.data() as MessageProps);
            });
            setMessages(messageList);
        });
    }, []);

    return (
        <div className="Chat">
            <div className="Receive">
                {messages.map((m, i) => <MessageList key={i} {...m} />)}
            </div>
            <div className="Send">
                <ChatBox onTextChange={onTextChange} onButtonClick={onButtonClick}/>
            </div>
        </div>
    );
}

export default Chat;