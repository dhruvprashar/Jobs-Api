require('dotenv').config();
require('express-async-errors');
const express = require('express');

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


//Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const app = express();
//connectDB
const connectDB = require('./db/connect')

const authenticateUser = require('./middleware/authentication')
//routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')



// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const RateLimit = require('express-rate-limit');

app.use(express.json());
// extra packages
app.set('trust proxy',1);
app.use(rateLimiter({
  windowMs: 15*60*1000, //15min
  max:100, //each IP have 100 req per windowMs
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/',(req,res)=>{
  res.send('<h1>Jobs Api</h1> <a href ="/api-docs">Documentation</a>')
})

app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser,jobsRouter);

// app.get('/', (req, res) => {
//   res.send('jobs api');
// });

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


// {
//   "email": "nasakk21@gmail.com", "password":"ietart"
// }