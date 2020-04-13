import React, { useState, useContext } from "react";
import ActualState from "../context/ActualState";
import { getPlaceholder, getID } from "../functions/getPlaceHolder";
import { Flat } from "../context/interfaces";

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
		if (isNaN(parseFloat(value))) {
			setValue("0");
			setGoodValue(false);
		} else if (parseFloat(value) < previousValue) {
			setValue(value.toString());
			setGoodValue(false);
		} else {
			setValue(value.toString());
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
			<h3>{`${getPlaceholder(placeholder)} - ${getID(id)}`}</h3>
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
