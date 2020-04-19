import React, {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";
import { Flat, creatInitialObjects, IProps } from "./interfaces";
import getPreviousState from "../functions/getPreviousState";

const X: [Array<Flat>, Dispatch<SetStateAction<Flat[]>>] = [
	creatInitialObjects(),
	(e) => {},
];
const PreviousState = createContext(X);
export const PreviousStateProvider: React.FC<IProps> = (props) => {
	const [state, setState] = useState(
		props.value ? props.value : creatInitialObjects()
	);

	useEffect(() => {
		const get = async () => {
			// dodać przypadek braku połączenia z serwerem
			const x = await getPreviousState();
			if (x) {
				setState(x);
			}
		};
		get();
	}, []);
	return (
		<PreviousState.Provider value={[state, setState]}>
			{props.children}
		</PreviousState.Provider>
	);
};
export const PreviousStateConsumer = PreviousState.Consumer;

export default PreviousState;
