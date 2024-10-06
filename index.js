const express = require('express')
const cors = require('cors')
const connectToMongooDB = require('./db')
const auth = require('./routes/auth');
const personalDetails = require('./routes/personalDetails');
const favourite = require('./routes/favourite');
const cartdata = require('./routes/cartdata');

const app = express()
const port = 5000
connectToMongooDB();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/', auth)
app.use('/details', personalDetails)
app.use('/cart', cartdata)
app.use('/favourite', favourite)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
