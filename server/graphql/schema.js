const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

//declares functions that will be able to be called
const typeDefs = `
    type Task {
        id: ID!
        title: String!
        completed: Boolean
        canEdit: Boolean
    }

    type Query {
        tasks: [Task],
        getTaskByID(id: ID!): Task
    }

    type Mutation {
        addTask(title: String!): Task
        changeCompleted(id: ID!): Task
        updateTask(id: String!, title: String): Task
        deleteTask(id: ID!): Boolean
    }

    schema{
        query: Query
        mutation: Mutation
    }
`;

const schema = makeExecutableSchema({typeDefs: typeDefs,resolvers: resolvers});
module.exports = schema;