const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const alert = require('alert');
const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://adi:2001@cluster0.ozlgteg.mongodb.net/projectDB?retryWrites=true&w=majority");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render('index');
})

app.post("/", function(req, res){


var transporter =  nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'samkhansingh@gmail.com',
      pass: 'bcwkeegmnbbgmysw',
    },
  });

function inputdetails(){
var mailOptions = {
  from: req.body.email,
  to: 'samkhansingh@gmail.com',
  subject: req.body.subject+' from '+req.body.email,
  text: req.body.message
};
return mailOptions;
}


transporter.sendMail(inputdetails(), function(error, info){
  if (error) {
    alert("Error Occured");
  } else {
    res.redirect("/");
  }
     
});
})
mongoose.connect("mongodb+srv://adi:2001@cluster0.ozlgteg.mongodb.net/ProjectDB?retryWrites=true&w=majority");

const blogSchema = new mongoose.Schema({
  name: String,
  category: String,
  type: String,
  projectUrl: String,
  details: String,
  link1: String,
  link2: String,
  link3: String,
  na: String

});

const project = mongoose.model("project", blogSchema);

app.post("/portfolio-details", function(req, res){
  console.log(req.body.pro);
  const kk = req.body.pro;


  project.findOne({name: kk}, function(err, results){
        if(err)
        console.log(err);
        else
        res.render('portfolio-details', {category: results.category, type: results.type, projectUrl: results.projectUrl, details: results.details, link1: results.link1, link2: results.link2, link3: results.link3, na: results.na});
        // console.log(results);
      });


// .then(() => {
  // const db = mongoose.connection.db;
  // const coll = db.collection('project1')
  // coll.find({},function(err, result){
  //   if(err)
  //   console.log(err);
  //   else
  //     console.log(result)
  // });
// }).catch(err => console.log(err.message))








//  function(err, db) {
//   if(err) { return console.dir(err); }

//   const collection = db.collection('project1s');

//   collection.findOne({_id: '63d39acea4a59cfaa30b271e'}, function(err, results){
//     if(err)
//     console.log(err);
//     else
//     console.log(results);
//   })
// });
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
});