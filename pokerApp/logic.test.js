const valueRelated = require("./valueRelated");

test("adds 1 + 2 to equal 3", () => {
	expect(valueRelated(["ACE"], { ACE: 2 })).toEqual({
		fullHouse: false,
		pairs: "ACE",
		quads: false,
		sets: false,
		street: false,
		twoPairs: false,
		pairs: "ACE",
	});
});
test("street", () => {
	expect(
		valueRelated(["2", "3", "4", "5", "6", "7"], {
			2: 1,
			3: 1,
			4: 1,
			5: 1,
			6: 1,
			7: 1,
		})
	).toEqual({
		fullHouse: false,
		pairs: false,
		quads: false,
		sets: false,
		street: ["3", "4", "5", "6", "7"],
		twoPairs: false,
	});
});
