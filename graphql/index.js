const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const { typeTest } = require("./schemas/test");
const { resolversTest } = require("./resolvers/test");
console.log("typeTest", typeTest);

const typeDefs = gql`
	type Query {
		hello: String
	}
`;

const resolvers = {
	Query: {
		hello: () => "Hello World"
	}
};

const app = express();
const server = new ApolloServer({
	typeDefs: typeTest,
	resolvers: resolversTest
});
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => {
	console.log(`server ready at http://127.0.0.1:4000${server.graphqlPath}`);
});
