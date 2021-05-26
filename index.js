const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_pass}@cluster0.dyvn0.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors());
const port = 5000;





const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {

  const allCourses = client.db("CourseManagement").collection("allCourses");
    const gradeBook = client.db("CourseManagement").collection("gradeBook");
    const UploadSyllabus = client.db("CourseManagement").collection("uploadSyllabus");
    const Notification = client.db("CourseManagement").collection("Notification");
    const Assignment = client.db("CourseManagement").collection("Assignment");

  console.log("port is" + {port} + "Db Connected")

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
 allCourses.find({})
 .toArray((err,documents)=>{
     res.send(documents)
 })
})


////uploadSyllabus
  
app.post('/addSyllabus',(req,res)=>{
  const syllabus=req.body;
  console.log("/addSyllabus")
  UploadSyllabus.insertOne(syllabus)
  .then(result =>{
      console.log(result.insertedCount);
      res.send(result.insertedCount)
  })
})

app.get('/syllabusall',(req,res)=>{
  UploadSyllabus.find({})
 .toArray((err,documents)=>{
     res.send(documents)
 })
})
   
////Grade
  
  
app.post('/addGrades',(req,res)=>{
  const grade=req.body;
  console.log("/addSyllabus")
  gradeBook.insertOne(grade)
  .then(result =>{
      console.log(result.insertedCount);
      res.send(result.insertedCount)
  })
})

app.get('/Gradeeall',(req,res)=>{
  gradeBook.find({})
 .toArray((err,documents)=>{
     res.send(documents)
 })
})

 ////Notification

 app.post('/addNotification',(req,res)=>{
  const feed=req.body;
  Notification.insertOne(feed)
  .then(result =>{
      console.log(result.insertedCount);
      res.send(result.insertedCount)
  })
})

app.get('/allNotification',(req,res)=>{
  Notification.find({})
 .toArray((err,documents)=>{
     res.send(documents)
 })
})

///Assignments

app.post('/addAssignments',(req,res)=>{
  const feedasas=req.body;
  Assignment.insertOne(feedasas)
  .then(result =>{
      console.log(result.insertedCount);
      res.send(result.insertedCount)
  })
})

app.get('/allAssignments',(req,res)=>{
  Assignment.find({})
 .toArray((err,documents)=>{
     res.send(documents)
 })
})



});


app.listen(port)