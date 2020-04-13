import { Flat } from "../context/interfaces";

export interface IControlInputs {
	attributesToTake: Array<string>;
}
export interface IUpdateValue {
	ids: number;
	value: number & Date; // żeby typescript się nie pluł, że mogę nadpisać datę numberem
	placeholder: keyof Flat;
}
export enum FlatValues {
	id = "id",
	date = "date",
	coldWater = "coldWater",
	hotWater = "hotWater",
	electricityOne = "electricityOne",
	electricityTwo = "electricityTwo",
	heat = "heat",
}

export interface IMessage {
	message: string;
}

export interface IButton {
	onChange: Function;
}
