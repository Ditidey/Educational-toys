const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('educational toys server is running')
})

app.listen(port, ()=>{
    console.log(`educational toys server is running on ${port}`)
})