import React, { useContext } from "react";
import ActualState from "../context/ActualState";
import { Flat } from "../context/interfaces";
import axios from "axios";
import { url } from "../config/config";
import { IButton, FlatValues } from "./interfaces";
import PreviousState from "../context/PreviousState";

// const url = "http://node-mongo:3000/post";
const config = {
	headers: {
		"Access-Control-Allow-Origin": "*",
	},
};

const Button: React.FC<IButton> = ({ onChange }) => {
	const context = useContext(ActualState);
	const [prevContext, setPrev] = useContext(PreviousState);
	const x = Object.keys(context[0]) as Array<keyof typeof context[0]>;
	const postData = (data: Array<Flat>) => {
		context.map((flat, index) => {
			x.map((item) => {
				return flat[item] === 0 ? (flat[item] = prevContext[index][item]) : "";
			});
		});
		axios
			.post(`${url}/post`, data, config)
			.then((res) => {
				setPrev(context);
				onChange({ message: "Dane zostały przesłane na server!", show: true });
			})
			.catch((err: Error) => onChange({ message: err.message, show: true }));
	};
	return (
		<button onClick={() => postData(context)}>Wyślij dane z liczników</button>
	);
};
export default Button;
