const { ApolloServer } = require("apollo-server"); // Import ApolloServer from apollo-server
// Import schema from graphql files
const { importSchema } = require("graphql-import"); // Import importSchema from graphql-import
const EtherDataSource = require("./datasource/ethDatasource");// Import EtherDataSource from ethDatasource.js
const typeDefs = importSchema("./schema.graphql"); // Import schema from graphql files

require("dotenv").config();// Load.env file

// Define resolvers
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => 
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),  
  }),
});

// Set timeout and start server 
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});