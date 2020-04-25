import React from "react";
import { url } from "../config/config";
const GetCSV: React.FC = () => {
	const getData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		fetch(`${url}/getCSV`).then((file) =>
			file.blob().then((blob) => {
				let url = window.URL.createObjectURL(blob);
				let a = document.createElement("a");
				a.href = url;
				a.download = "dane.csv";
				a.click();
			})
		);
	};
	return (
		<button
			className="download"
			onClick={(e) => {
				getData(e);
			}}
		>
			Pobierz dane z serwera
		</button>
	);
};
export default GetCSV;
