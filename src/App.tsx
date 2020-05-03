import React, { useState } from "react";
import "./App.scss";
import { ActualStateProvider } from "./context/ActualState";
import { PreviousStateProvider } from "./context/PreviousState";
import ControlInputs from "./components/ControlInputs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "./components/Button";
import Message from "./components/Message";
import GetCSV from "./components/GetCSV";
import CustomElectricity from "./components/CustomEletricity";
function App() {
	const [send, setSend] = useState({ show: false, message: "" });
	return (
		<div className="App">
			<ActualStateProvider>
				<PreviousStateProvider setMessage={setSend}>
					<Router>
						<div className="title">
							<span>System spisywania liczników</span>
						</div>
						{send.show ? <Message message={send.message} /> : ""}
						<Route exact path="/">
							<Link to="/water">Woda</Link>
							<Link to="/electricity">Prąd</Link>
							<Link to="/heat">Ogrzewanie</Link>
							<Button onChange={setSend} />
							<GetCSV />
						</Route>
						<Route strict path={["/water", "/electricity", "/heat"]}>
							<Link to="/">Powrót</Link>
						</Route>
						<Switch>
							<Route path="/water">
								<ControlInputs attributesToTake={["hotWater", "coldWater"]} />
							</Route>
							<Route path="/electricity">
								<CustomElectricity
									attributesToTake={[
										"electricityOne",
										"electricityTwo",
										"togetherOne",
										"togetherTwo",
									]}
								/>
								{/* <ControlInputs attributesToTake={["electricityOne"]} /> */}
							</Route>
							<Route path="/heat">
								<ControlInputs attributesToTake={["heat"]} />
							</Route>
						</Switch>
					</Router>
				</PreviousStateProvider>
			</ActualStateProvider>
		</div>
	);
}

export default App;
