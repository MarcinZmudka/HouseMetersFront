import React, { useState } from "react";
import "./App.scss";
import { ActualStateProvider } from "./context/ActualState";
import { PreviousStateProvider } from "./context/PreviousState";
import ControlInputs from "./components/ControlInputs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "./components/Button";
import Message from "./components/Message";
function App() {
	const [send, setSend] = useState({ show: false, message: "" });
	return (
		<div className="App">
			<PreviousStateProvider>
				<ActualStateProvider>
					<Router>
						<div className="title">System spisywania liczników</div>
						{send.show ? <Message message={send.message} /> : ""}
						<Route exact path="/">
							<Link to="/water">Woda</Link>
							<Link to="/electricity">Prąd</Link>
							<Link to="/heat">Ogrzewanie</Link>
							<Button onChange={setSend} />
						</Route>
						<Route strict path={["/water", "/electricity", "/heat"]}>
							<Link to="/">Powrót</Link>
						</Route>
						<Switch>
							<Route path="/water">
								<ControlInputs attributesToTake={["hotWater", "coldWater"]} />
							</Route>
							<Route path="/electricity">
								<ControlInputs
									attributesToTake={["electricityOne", "electricityTwo"]}
								/>
							</Route>
							<Route path="/heat">
								<ControlInputs attributesToTake={["heat"]} />
							</Route>
						</Switch>
					</Router>
				</ActualStateProvider>
			</PreviousStateProvider>
		</div>
	);
}

export default App;
