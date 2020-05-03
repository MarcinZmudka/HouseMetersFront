export function getPlaceholder(key: string) {
	switch (key) {
		case "coldWater":
			return "Zimna Woda";
		case "hotWater":
			return "Ciepła Woda";
		case "electricityOne":
			return "Licznik eletryczny 1";
		case "electricityTwo":
			return "Licznik eletryczny 2";
		case "heat":
			return "Ciepłomierz lub gaz";
		case "togetherOne":
			return "Licznik elektryczny części wspólnych 1";
		case "togetherTwo":
			return "Licznik elektryczny części wspólnych 2";
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
			return "electricityOne";
		case "Licznik eletryczny 2":
			return "electricityTwo";
		case "Ciepłomierz lub gaz":
			return "heat";
		case "Licznik elektryczny części wspólnych 2togetherTwo":
			return "togetherTwo";
		case "Licznik elektryczny części wspólnych 1":
			return "togetherOne";
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
