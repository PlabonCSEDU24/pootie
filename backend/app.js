const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const authRouter = require('./routers/authRouter');
const mongoose = require('mongoose');


const PORT = config.get("DEV_BACKEND_PORT");
const dbAddress = config.get('MONGODB_SERVER');

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', authRouter);

mongoose
  .connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log('MongoDB Connection Failed!', err.message));

const server = app.listen(process.env.PORT || PORT, async () => {
  console.log(`server started on port ${PORT}`);
});

app.use('/', (req, res) => {
  res.send('YO! Welcome to pootie backend api!');
})