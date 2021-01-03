const { ApolloServer, PubSub } = require('apollo-server');

//connect to database
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers/index.js')

const { MONGODB } = require('./config.js')

const pubsub = new PubSub();

// to make sure you get all of the data back from the response and request from the 200 http call use context
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub})
});

mongoose.connect(MONGODB, {useNewUrlParser: true}).then(() => {
    console.log(`MongoDb Connected`)
    return server.listen({ port: 5000});
}).then(res => {
    console.log(`Server running at ${res.url}`)
})