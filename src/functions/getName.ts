function getNameOfFlat(id: number): string {
	let newId = id;
	id >= 1 && id < 7 ? (newId = 2) : (newId = id);
	switch (newId) {
		case 0:
			return "Dom";
		case 2:
			return `Mieszkanie ${id}`;
		case 7:
			return "Mały Lokal";
		case 8:
			return "Duży Lokal";
		default:
			break;
	}
	return "Error";
}
export default getNameOfFlat;
