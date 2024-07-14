const express = require('express')
require('./db/index.js')

const cors = require('cors');
const userRouter = require('./routes/user/controller.js');

const app = express();

app.use(express.json())
app.use(cors())


app.use("/user", userRouter);

app.listen(3000, () => {
    console.log('app is runig')
})