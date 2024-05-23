const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const routes = require('./routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');


dotenv.config()

const init = async()=>{
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    })

    const model = await loadModel();
    server.app.model = model;

    server.route(routes);

    server.ext('onPreResponse', (requset, h)=>{
        const response = requset.response;

        if(response instanceof InputError){
            const newResponse = h.response({
                status: 'fail',
                message: response.message,
            })

            newResponse.code(response.statusCode);
            return newResponse;
        }

        if(response.isBoom){
            console.log(response);
            const newResponse = h.response({
                status: 'fail',
                message: response.output.payload.message,
            })
            newResponse.code(response.output.statusCode);
            return newResponse;
        }

        return h.continue;
    })


    await server.start();
    console.log(`Server started at ${server.info.uri}`);
}

process.on('unhandledRejection', (error)=>{
    console.log(error.stack);
    process.exit(1);
})

init();