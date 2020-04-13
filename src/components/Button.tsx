import React, { useContext } from "react";
import ActualState from "../context/ActualState";
import { Flat } from "../context/interfaces";
import axios from "axios";
import { url } from "../config/config";
import { IButton } from "./interfaces";

// const url = "http://node-mongo:3000/post";
const config = {
	headers: {
		"Access-Control-Allow-Origin": "*",
	},
};

const Button: React.FC<IButton> = ({ onChange }) => {
	const context = useContext(ActualState);
	const postData = (data: Array<Flat>) => {
		axios
			.post(`${url}/post`, data, config)
			.then((res) =>
				onChange({ message: "Dane zostały przesłane na server!", show: true })
			)
			.catch((err: Error) => onChange({ message: err.message, show: true }));
	};
	return (
		<button onClick={() => postData(context)}>Wyślij dane z liczników</button>
	);
};
export default Button;
