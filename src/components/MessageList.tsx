import React from 'react';

type Props = {
    text: string,
    create_at: any,
    user_name: string,
    user_dep: string,
}

const MessageList: React.FC<Props> = props => {
    return (

            <div className="Message">
                <p className="">部署名:{props.user_dep}</p>
                <p className="">ユーザー名:{props.user_name}</p>
                <p className="">{props.text}</p>
            </div>
    );
}

export default MessageList;