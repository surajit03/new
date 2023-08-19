const connectToMOngo =require('./db')
const express = require('express');
let cors =require('cors')

const port = 5000;
const app = express();
connectToMOngo();

app.use(cors());
app.use(express());
 
// midel wier
app.use(express.json());

// Available router
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/coustomer',require('./routes/coustomer.js'))

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});