import React from 'react';

type Msgs = {
	message: string;
	sender: 'user' | 'bot';
};

const MsgContext = React.createContext({});

export default MsgContext;
