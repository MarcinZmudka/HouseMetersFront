import React, {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";
import { Flat, creatInitialObjects, IProps, House } from "./interfaces";
import getPreviousState from "../functions/getPreviousState";

const X: [
	Array<Flat | House>,
	Dispatch<SetStateAction<Array<Flat | House>>>
] = [creatInitialObjects(), (e) => {}];
const PreviousState = createContext(X);
export const PreviousStateProvider: React.FC<IProps> = (props) => {
	const [state, setState] = useState(
		props.value ? props.value : creatInitialObjects()
	);

	useEffect(() => {
		const get = async () => {
			const x = await getPreviousState();
			if (x) {
				setState(x);
			} else {
				if (props.setMessage) {
					props.setMessage({
						show: true,
						message: "Brak połączenia z serwerem",
					});
				}
			}
		};
		get();
	}, [props]);
	return (
		<PreviousState.Provider value={[state, setState]}>
			{props.children}
		</PreviousState.Provider>
	);
};
export const PreviousStateConsumer = PreviousState.Consumer;

export default PreviousState;
