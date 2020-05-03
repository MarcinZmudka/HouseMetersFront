import React, { useContext } from "react";
import ActualState from "../context/ActualState";
import PreviousState from "../context/PreviousState";
import Input from "./Input";
import { House, Flat } from "../context/interfaces";
import { IControlInputs, IUpdateValue, FlatValues } from "./interfaces";

const CustomElectricity: React.FC<IControlInputs> = ({ attributesToTake }) => {
	const actualState = useContext(ActualState);
	const [previousState] = useContext(PreviousState);
	const matchArguments = (house: House | Flat) => {
		const keys = Object.entries(house) as Array<[keyof House, any]>;
		const filter = keys.filter((item) => {
			if (attributesToTake.includes(item[0])) {
				return true;
			}
			return false;
		});
		return filter;
	};
	const updateValue = ({ ids, value, placeholder }: IUpdateValue) => {
		const objectFlat = actualState.filter((flat) => {
			return flat.id === ids ? true : false;
		});
		const flat = objectFlat[0];
		const property: keyof typeof FlatValues = placeholder;
		flat[property] = value;
	};
	return (
		<>
			{previousState.map((flat) => {
				const state = matchArguments(flat);
				return state.map((item, index: number) => (
					<Input
						key={flat.id.toString() + index.toString()}
						id={flat.id.toString() + index.toString()}
						placeholder={item[0]}
						previousValue={item[1]}
						onChange={updateValue}
					/>
				));
			})}
		</>
	);
};

export default CustomElectricity;
