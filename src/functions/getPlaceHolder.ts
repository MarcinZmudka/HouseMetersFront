export function getPlaceholder(key: string) {
	switch (key) {
		case "coldWater":
			return "Zimna Woda";
		case "hotWater":
			return "Ciepła Woda";
		case "electricity":
			return "Licznik eletryczny 1";
		case "heat":
			return "Ciepłomierz lub gaz";
		case "togetherOneOne":
			return "Licznik elektryczny części wspólnych 456-1";
		case "togetherOneTwo":
			return "Licznik elektryczny części wspólnych 456-2";
		case "togetherTwoOne":
			return "Licznik elektryczny części wspólnych 222-1";
		case "togetherTwoTwo":
			return "Licznik elektryczny części wspólnych 222-2";
		default:
			return "ERROR";
	}
}

export function getKey(key: string) {
	switch (key) {
		case "Zimna Woda":
			return "coldWater";
		case "Ciepła Woda":
			return "hotWater";
		case "Licznik eletryczny 1":
			return "electricity";
		case "Ciepłomierz lub gaz":
			return "heat";
		case "Licznik elektryczny części wspólnych 222-1":
			return "togetherTwoOne";
		case "Licznik elektryczny części wspólnych 222-2":
			return "togetherTwoTwo";
		case "Licznik elektryczny części wspólnych 456-1":
			return "togetherOneOne";
		case "Licznik elektryczny części wspólnych 456-2":
			return "togetherOneTwo";
		default:
			return "ERROR";
	}
}
export function getID(id: string): number {
	if (id.length > 1) {
		return parseInt(id.charAt(0));
	}
	return parseInt(id);
}
