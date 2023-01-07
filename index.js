const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@project1.puheqno.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("home").collection("users");
    const internshipCollection = client.db("home").collection("internship");
    const applyCollection =client.db("home").collection("apply");

    app.get("/users", async (req, res) => {
      const query = {};
      const users = await userCollection.find(query).toArray();
      res.send(users);
    });

    app.get("/users/student", async (req, res) => {
      const query = { role: "Student" };
      const student = await userCollection.find(query).toArray();
      res.send(student);
    });

    app.get("/users/employer", async (req, res) => {
      const query = { role: "Employer" };
      const employer = await userCollection.find(query).toArray();
      res.send(employer);
    });

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.find(query).toArray();
      res.send(user);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    app.get("/internship", async (req, res) => {
      const query = {};
      const users = await internshipCollection.find(query).toArray();
      res.send(users);
    });

    app.get('/internship/:id',async(req,res)=>{
      const id= req.params.id;
      const query={_id:ObjectId(id)}
      const result =await internshipCollection.findOne(query)
      res.send(result);

    })
app.post('/apply',async(req,res)=>{
const apply =req.body;
const result =await applyCollection.insertOne(apply);
res.send(result);


});

  } finally {
  }
}
run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
