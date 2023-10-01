const connectToMOngo =require('./db')
const express = require('express');
const cookieParser = require('cookie-parser');
let cors =require('cors')


const port = 5000;
const app = express();
connectToMOngo();

app.use(cors());
app.use(express());
 
// midel wier
app.use(express.json());
app.use(cookieParser());

// Available router
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/coustomer',require('./routes/coustomer.js'))
app.use('/api/product',require('./routes/product.js'))
app.use('/api/invoice',require('./routes/invoices.js'))
app.use('/api/profile',require('./routes/Profile.js'))



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});