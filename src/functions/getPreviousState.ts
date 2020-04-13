import axios from "axios";
import { Flat } from "../context/interfaces";
import { url } from "../config/config";

const getPreviousState = async () => {
	const response = await axios
		.get(`${url}/get`)
		.then((res) => res.data)
		.catch((err) => console.error(err));
	if (response) {
		response.flats.map((item: any) => delete item._id);
		const flats: Array<Flat> = [...response.flats];
		return await flats;
	}
	return undefined;
};
export default getPreviousState;
