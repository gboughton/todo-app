const mongoose = require('mongoose');
const hapi = require('hapi');
const { graphqlHapi } = require('apollo-server-hapi');
const { graphiqlHapi } = require('apollo-server-hapi');
const execSchema = require('./graphql/schema');

mongoose.set('debug',true);
//connect mongoose to local mongodb database
mongoose.connect('mongodb://localhost:27017/local')
    .then(()=> console.log('Successfully connected to MongoDB'))
    .catch(err => console.error(err));

async function launchServer() {
    //start server
    const server = new hapi.Server({host: 'localhost',port: 3001});

    //register hapi plugins
    await server.register({
        plugin:  graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                schema: execSchema
            },
            route: {
              cors: true
            },

        },
    
    });

    await server.register({
        plugin: graphiqlHapi,
        options: {
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            }
        },
    });
 
    
    try {
        await server.start();
    }
    catch (err) {
        console.log("Error starting server: ", err)
    }
   
};

launchServer()
    .then(() => console.log('Server Launched'))
    .catch((err) => console.log('Server Error: ', err));