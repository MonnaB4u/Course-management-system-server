const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.dyvn0.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000
// console.log(process.env.DB_User + "  ___ "+process.env.db_pass )


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {

  const allCourses = client.db("CourseManagement").collection("allCourses");
  console.log("Db Connected")
 

//for send data in data base from the fakedata

 app.post('/addCourse',(req,res)=>{
     const course=req.body;
     allCourses.insertMany(course)
     .then(result =>{
         console.log(result.insertedCount);
         res.send(result.insertedCount)
     })
 })

  app.get('/courseall',(req,res)=>{
    allCourses.find({}).limit(6)
    .toArray((err,documents)=>{
        res.send(documents)
    })
  })


////next step

});


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port);