export function valueRelated(values, keys) {
	const VALUES = [
		"ACE",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"JACK",
		"QUEEN",
		"KING",
		"ACE",
	];
	const STREETS = streets();

	function isStreet(arr) {
		const result = [];
		if ("ACE" in arr) arr = arr.shift("ACE");
		for (let i = 0; i < arr.length; i++) {
			const contendor = arr.slice(i, i + 5);
			if (contendor == "ACE" && contendor.concat(arr.slice(0, 4)) in STREETS)
				result.shift(contendor.concat(arr.slice(0, 4)));
			if (contendor.length == 5)
				if (contendor in STREETS) result.push(contendor);
		}
		return result[result.length - 1] ? result[result.length - 1] : false;
	}

	function streets() {
		const streets = {};
		for (let i = 0; i < 9; i++) {
			let street = VALUES.slice(i, i + 5);
			streets[street] = i;
		}
		streets[("ACE", "2", "3", "4", "5")] = 9;
		return streets;
	}

	const result = {};
	const pairs = values.filter((k) => keys[k] == "2");
	const sets = values.filter((k) => keys[k] == "3");
	const quads = values.filter((k) => keys[k] == "4").join(", ");
	const sorted = values.sort((v) => VALUES.indexOf(v));
	const street = isStreet(sorted);
	result.pairs = false;
	result.sets = false;
	if (sets.length) result.sets = sets.join(", ");
	result.twoPairs = false;
	result.street = street;
	result.fullHouse = false;
	result.quads = false;
	if (quads) result.quads = quads;

	if (pairs) {
		if (pairs.length == 1) result.pairs = pairs.join(", ");
		else {
			if (pairs.length == 2) result.twoPairs = pairs;
			if (pairs.length > 2 && sets.length == 0)
				result.twoPairs = [pairs[pairs.length - 1], pairs[pairs.length - 2]];
			if (pairs.length && sets.length) {
				result.twoPairs = false;
				result.fullHouse = `${sets[sets.length - 1]} full of ${
					pairs[pairs.length - 1]
				}`;
			}
		}
	}

	return result;
}

module.exports = valueRelated;
