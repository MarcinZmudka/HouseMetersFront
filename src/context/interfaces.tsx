import { ReactNode } from "react";

export interface Flat {
	id: number;
	coldWater: number;
	hotWater: number;
	electricityOne: number;
	heat: number;
}
export interface House extends Flat {
	electricityTwo: number;
	togetherOne: number;
	togetherTwo: number;
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
	heat: number;
	constructor(
		id: number,
		coldWater: number,
		hotWater: number,
		electricityOne: number,
		heat: number
	) {
		this.id = id;
		this.coldWater = coldWater;
		this.hotWater = hotWater;
		this.electricityOne = electricityOne;
		this.heat = heat;
	}
}
class ObjectHouse implements House {
	id: number;
	coldWater: number;
	hotWater: number;
	electricityOne: number;
	electricityTwo: number;
	heat: number;
	togetherOne: number;
	togetherTwo: number;
	constructor(
		id: number,
		coldWater: number,
		hotWater: number,
		electricityOne: number,
		electricityTwo: number,
		heat: number,
		togetherOne: number,
		togetherTwo: number
	) {
		this.id = id;
		this.coldWater = coldWater;
		this.hotWater = hotWater;
		this.electricityOne = electricityOne;
		this.electricityTwo = electricityTwo;
		this.heat = heat;
		this.togetherOne = togetherOne;
		this.togetherTwo = togetherTwo;
	}
}
export const creatInitialObjects = () => {
	const array: Array<Flat> = [];
	array.push(new ObjectHouse(0, 0, 0, 0, 0, 0, 0, 0));
	for (let i = 1; i < 9; i++) {
		array.push(new ObjectFlat(i, 0, 0, 0, 0));
	}
	return array;
};
