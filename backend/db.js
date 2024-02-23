const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/iNotebook"


async function connectToMongo() {
    await mongoose.connect("mongodb://localhost:27017/iNotebook").then(()=> 
    { console.log("Connected to Mongo Successfully")}).catch(()=>{
      console.log('error')
    });
  }
  
  module.exports = connectToMongo;


/*1. Nodemon error : After installation of nodemon as dev dependency, when you enter  command "nodemon index.js" will give you error that nodemone is not recognized.
       solution : to go package.json then inside scripts just add "start": "nodemon index.js" just below the test script and now you can use command "npm start" instead of "nodemon index.js" to run you index file.

2. Mongoose error : mongoose updated itself and now we cannot use a call back function inside a connect function instead you can use a then and catch like:
mongoose.connect(URI).then(()=>console.log("Connected")).catch((e)=>console.log(e.message))*/