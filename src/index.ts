import { ApolloServer } from "apollo-server";
import { builder } from "./builder";
import "./schema";

const schema = builder.toSchema();
const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
    console.log(`Server started: ${url}`);
});