import React, { useContext } from "react";
import ActualState from "../context/ActualState";
import { Flat } from "../context/interfaces";
import axios from "axios";
import { url } from "../config/config";
import { IButton } from "./interfaces";
import PreviousState from "../context/PreviousState";

const config = {
	headers: {
		"Access-Control-Allow-Origin": "*",
	},
};

const Button: React.FC<IButton> = ({ onChange }) => {
	const context = useContext(ActualState);
	const [prevContext, setPrev] = useContext(PreviousState);

	const postData = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		data: Array<Flat>
	) => {
		e.preventDefault();
		const combinedData = putOldValuesIntoZero(data, prevContext);
		axios
			.post(`${url}/post`, combinedData, config)
			.then((res) => {
				setPrev(combinedData);
				onChange({ message: "Dane zostały przesłane na server!", show: true });
			})
			.catch((err: Error) => onChange({ message: err.message, show: true }));
	};
	const putOldValuesIntoZero = (context: Flat[], prevContext: Flat[]) => {
		const keys = Object.keys(context[0]) as Array<keyof typeof context[0]>;
		const newState = context.map((flat, index) => {
			return Object.assign({}, context[index]);
		});
		for (let i = 0; i < context.length; i++) {
			for (let key of keys) {
				if (context[i][key] === 0) {
					newState[i][key] = prevContext[i][key];
				}
			}
		}
		return newState;
	};

	return (
		<button
			onClick={(e) => {
				postData(e, context);
			}}
		>
			Wyślij dane z liczników
		</button>
	);
};
export default Button;
