const { gql } = require("apollo-server-express");

const typeTest = gql`
	type Person {
		id: Int
		name: String
	}
	type Query {
		allPeople: [Person]
		person(id: Int!): Person
	}
	type Mutation {
		createPerson(id: Int, name: String): [Person]
	}
`;

module.exports = {
	typeTest
};
