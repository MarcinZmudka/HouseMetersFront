import React, { useContext } from "react";
import ActualState from "../context/ActualState";
import PreviousState from "../context/PreviousState";
import Input from "./Input";
import { Flat } from "../context/interfaces";
import { IControlInputs, IUpdateValue, FlatValues } from "./interfaces";

const ControlInputs: React.FC<IControlInputs> = ({ attributesToTake }) => {
	const actualState = useContext(ActualState);
	const [previousState] = useContext(PreviousState);
	const matchArguments = (flat: Flat) => {
		const x = Object.entries(flat) as Array<[keyof typeof flat, any]>;
		const filter = x.filter((item) => {
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
		<div>
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
		</div>
	);
};
export default ControlInputs;
