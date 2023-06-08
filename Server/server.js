import express from "express";
import mongoose from 'mongoose';
import { router as seatRouter } from './mongod/routes/seats.routes.js'
import cors from "cors";
import cookieParser from "cookie-parser";
import { all_seatModel } from "./mongod/models/seats.models.mjs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/seats', seatRouter);
// app.use(cookieParser)
app.use(
  cors({
    // allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    // exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET",
    preflightContinue: false
  })
);

// const baseURL = "http://localhost:3002/";

//------------------- Establish connection to MongoDB Database -------------------//

const connectToMongo = async function () {
  return mongoose.connect(
    'mongodb+srv://shubtest108:%23Test1234@cluster0.feiziul.mongodb.net/Unstop_train',
    { useNewUrlParser: true }
  );
};

connectToMongo()
  .then(function () {
    console.log('Connection to MongoDB Established.');
  })
  .catch(function (err) {
    console.log(err);
  });

//----------------------------- Routes to Database -----------------------------//

app.get("/", function(req, res){

  //This function crates 80 unreserved seats
  //Call Get "/" in postman to create 80 unreserved seats

  for(var i=1;i<=80;i++){

    const newSeat = new all_seatModel({ 
      seat_number: i,
      isReserved: false,
    });
    all_seatModel.insertMany(newSeat);
  }

  res.sendStatus(200);
});

//----------------------------- Listen Port -----------------------------//

app.listen(3002, function(){
  console.log("Server started at 3002");
});