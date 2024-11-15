const pathToRoutesFile = new URL('../routers/v1/*.js', import.meta.url).pathname;
console.log(pathToRoutesFile);

export const options = {
    definitions: {
        openapi: '3.0.0',
        info: {
            title: 'Image gram API',
            version: '1.0.0',
            description: 'This is a single CRUD API application made with Express and documented with Swagger',
        },
        services: [
            {
                url: 'http://localhost:3000/api/',
            },
        ],
    },
    apis: [ pathToRoutesFile ],   //'/Users\Hp\Desktop\ImageGram/src/routers/v1/*.js'
};

