const resolversTest = {
	Query: {
		allPeople: () => {
			return defaultTestData;
		},
		person: (root, { id }) => {
			return defaultTestData.filter(c => {
				return c.id === id;
			})[0];
		}
	},
	Mutation: {
		createPerson: (root, { id, name }) => {
			defaultTestData.push({ id, name });
			// return { id, name };
			return defaultTestData;
		}
	}
};

const defaultTestData = [
	{
		id: 1,
		name: "Reco"
	},
	{
		id: 2,
		name: "Tibe"
	}
];

module.exports = {
	resolversTest,
	defaultTestData
};
