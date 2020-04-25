import React, { useState, useContext } from "react";
import ActualState from "../context/ActualState";
import { getPlaceholder, getID } from "../functions/getPlaceHolder";
import { Flat } from "../context/interfaces";
import PreviousState from "../context/PreviousState";
import getNameOfFlat from "../functions/getName";

interface inputProps {
	placeholder: keyof Flat;
	previousValue: number;
	onChange: Function;
	id: string;
}

const Input: React.FC<inputProps> = ({
	placeholder,
	previousValue,
	onChange,
	id,
}: inputProps) => {
	const actualState = useContext(ActualState);
	const [goodValue, setGoodValue] = useState(true);
	const getValue = () => {
		const flat = actualState[getID(id)];
		const property: keyof typeof flat = placeholder;
		return flat[property].toString();
	};
	const [value, setValue] = useState(getValue());
	const updateValue = (event: React.FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value.replace(",", ".");
		const ids = getID(id);

		const regex = new RegExp(/([0-9]+\.+[0-9]+)|([0-9]+\.)|([0-9]+)/g);
		const newValue = value.match(regex);

		let correctValue = "";
		if (newValue) {
			/* 
				W przypadku gdyby pomiędzy cyfry dostała się litera
			*/
			correctValue = newValue.reduce((prev, current) => {
				return prev + current;
			}, "");
		} else {
			setValue("0");
			setGoodValue(false);
			return;
		}
		if (parseFloat(correctValue) < previousValue) {
			setValue(correctValue);
			setGoodValue(false);
		} else {
			setValue(correctValue);
			onChange({ ids, value, placeholder });
			setGoodValue(true);
		}
	};
	return (
		<>
			{!goodValue ? (
				<h3>Wartość mniejsza od stanu z poprzedniego miesiąca</h3>
			) : (
				""
			)}
			<h3>{`${getPlaceholder(placeholder)} - ${getNameOfFlat(getID(id))}`}</h3>
			<div className="input">
				<div className="box">
					<input
						type="text"
						placeholder={getPlaceholder(placeholder)}
						value={value === "0" ? "" : value}
						onChange={updateValue}
					/>
				</div>
			</div>
		</>
	);
};

export default Input;
