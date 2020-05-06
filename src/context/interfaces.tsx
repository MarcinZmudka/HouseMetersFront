import { ReactNode } from "react";

export interface Flat {
	id: number;
	coldWater: number;
	hotWater: number;
	electricity: number;
	heat: number;
}
export interface House extends Flat {
	togetherOneOne: number;
	togetherOneTwo: number;
	togetherTwoOne: number;
	togetherTwoTwo: number;
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
	electricity: number;
	heat: number;
	constructor(
		id: number,
		coldWater: number,
		hotWater: number,
		electricity: number,
		heat: number
	) {
		this.id = id;
		this.coldWater = coldWater;
		this.hotWater = hotWater;
		this.electricity = electricity;
		this.heat = heat;
	}
}
class ObjectHouse implements House {
	id: number;
	coldWater: number;
	hotWater: number;
	electricity: number;
	heat: number;
	togetherOneOne: number;
	togetherOneTwo: number;
	togetherTwoOne: number;
	togetherTwoTwo: number;
	constructor(
		id: number,
		coldWater: number,
		hotWater: number,
		electricity: number,
		heat: number,
		togetherOneOne: number,
		togetherOneTwo: number,
		togetherTwoOne: number,
		togetherTwoTwo: number
	) {
		this.id = id;
		this.coldWater = coldWater;
		this.hotWater = hotWater;
		this.electricity = electricity;
		this.heat = heat;
		this.togetherOneOne = togetherOneOne;
		this.togetherOneTwo = togetherOneTwo;
		this.togetherTwoOne = togetherTwoOne;
		this.togetherTwoTwo = togetherTwoTwo;
	}
}
export const creatInitialObjects = () => {
	const array: Array<Flat | House> = [];
	array.push(new ObjectHouse(0, 0, 0, 0, 0, 0, 0, 0, 0));
	for (let i = 1; i < 9; i++) {
		array.push(new ObjectFlat(i, 0, 0, 0, 0));
	}
	return array;
};
