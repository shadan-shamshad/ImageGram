import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from '../router/apiRouter.js';
import multer from 'multer';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { options } from './utils/swaggerOptions.js'

const PORT = 3000;  // port number
const swaggerDocs = swaggerJSDoc(options);
const app = express();  // create express app server instance

const upload = multer(); // multer instance

app.use(express.json()); //middleware to parse json data
app.use(express.text());
app.use(express.urlencoded());


app.use('/api', apiRouter); // if the URL starts with /api, then the request is forwarded to the apiRouter

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/ping', isAuthenticated, (req,res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.user);
    return res.json({message: 'It is pong' });
});

//app.get('/ping/:name/:id', (req,res) => {
//     const name = req.params.name    // req.params -> {name: 'value', id: 2}
//     return res.json({message: 'It is pong' +'  ' + name  });
// });

// app.get('/hello', (req,res) => {
//     return res.json({message: 'Hello World'});
    
// });

// app.post('/hello', (req,res) => {
//     return res.json({message: 'POST: Hello World'});
    
// });

// app.put('/hello', (req,res) => {
//     return res.json({message: 'PUT: Hello World'});
    
// });

// app.delete('/hello', (req,res) => {
//     return res.json({message: 'DELETE: Hello World'});
   
// });

// function m1(req, res, next){
//     console.log('m1');
//     next();
// }

// function m2(req, res, next){
//     console.log('m2');
//     next();
// }

// function m3(req, res, next){
//     console.log('m3');
//     next();
// }

// app.post('/posts', [m1, m2, m3], createPost);

//app.post('/posts', s3uploader.single('image'), createPost);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

// SIGNUP => SCHEMA -> repository -> service -> controller -> validation -> routers