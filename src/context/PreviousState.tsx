import React, { createContext, useState, useEffect } from "react";
import { Flat, creatInitialObjects, IProps } from "./interfaces";
import getPreviousState from "../functions/getPreviousState";

// const X: [Array<Flat>, Dispatch<SetStateAction<Flat[]>>] = [
// 	creatInitialObjects(),
// 	(e) => {},
// ];
const PreviousState = createContext<Flat[]>([]);
export const PreviousStateProvider: React.FC<IProps> = (props) => {
	const [state, setState] = useState(creatInitialObjects());
	useEffect(() => {
		const get = async () => {
			const x = await getPreviousState();
			if (x) {
				setState(x);
			}
		};
		get();
	}, []);
	return (
		<PreviousState.Provider value={state}>
			{props.children}
		</PreviousState.Provider>
	);
};
export const PreviousStateConsumer = PreviousState.Consumer;

export default PreviousState;
