const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kos6m2u.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    await client.connect();

     const toysCollections = client.db('creative-creators-toys').collection('educational-toys');
    
    app.post('/addToys', async(req, res)=>{
        const data = req.body;
        console.log(data);
        const result = await toysCollections.insertOne(data);
        res.send(result)
    })
    app.get('/allToys', async(req, res)=>{
        let query = {};
        if(req.query?.email){
            query = {email: req.query.email}
        }
        const result = await toysCollections.find(query).toArray();
        res.send(result)
    })
    app.delete('/allToys/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await toysCollections.deleteOne(query);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('educational toys server is running')
})

app.listen(port, ()=>{
    console.log(`educational toys server is running on ${port}`)
})