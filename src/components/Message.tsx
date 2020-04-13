import React from "react";
import { IMessage } from "./interfaces";

const Message: React.FC<IMessage> = ({ message }) => {
	return <div className="text">{message}</div>;
};

export default Message;
