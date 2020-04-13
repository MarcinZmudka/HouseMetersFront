import React, { createContext, useState } from "react";
import { Flat, IProps, creatInitialObjects } from "./interfaces";

// const X: [Array<Flat>, Dispatch<SetStateAction<Flat[]>>] = [
// 	creatInitialObjects(),
// 	(e) => {},
// ];
// const test: Flat[] = [];
const ActualState = createContext<Flat[]>([]);

export const ActualStateProvider: React.FC<IProps> = (props) => {
	const [value] = useState(creatInitialObjects());
	return (
		<ActualState.Provider value={value}>{props.children}</ActualState.Provider>
	);
};
export const ActualStateConsumer = ActualState.Consumer;
export default ActualState;

/*
    0 - dom
    1 - 6 mieszkania
    7 - Mały Lokal
    8 - Duży Lokal
*/
