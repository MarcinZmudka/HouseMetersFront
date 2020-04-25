import { ReactNode } from "react";

export interface Flat {
	id: number;
	coldWater: number;
	hotWater: number;
	electricityOne: number;
	electricityTwo: number;
	heat: number;
}
export interface IProps {
	children: ReactNode;
	value?: Flat[];
	setMessage?: Function;
}

class ObjectFlat implements Flat {
	id: number;
	coldWater: number;
	hotWater: number;
	electricityOne: number;
	electricityTwo: number;
	heat: number;
	constructor(
		id: number,
		coldWater: number,
		hotWater: number,
		electricityOne: number,
		electricityTwo: number,
		heat: number
	) {
		this.id = id;
		this.coldWater = coldWater;
		this.hotWater = hotWater;
		this.electricityOne = electricityOne;
		this.electricityTwo = electricityTwo;
		this.heat = heat;
	}
}
export const creatInitialObjects = () => {
	const array: Array<Flat> = [];
	for (let i = 0; i < 9; i++) {
		array.push(new ObjectFlat(i, 0, 0, 0, 0, 0));
	}
	return array;
};
