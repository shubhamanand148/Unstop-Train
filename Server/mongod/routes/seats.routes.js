// Import the required modules
import express from 'express';
import cors from "cors";
import { all_seatModel } from '../models/seats.models.mjs';

const router = express.Router();

router.use(
  cors({
    origin: "*",
    methods: "PATCH",
    preflightContinue: false
  })
);

router.patch('/', async (req, res) => {

  // Get the unreserved seat.
  async function getSeats(){
    const seat = await all_seatModel.findOne({isReserved: false}).sort({seat_number: 'ascending'})
    if(seat !== null) return seat.seat_number;
  };

  getSeats().then(function(first_seat){

    //Reserve the seats from the unreserved seats.
    if (first_seat) {
      for (var i=0; i<req.body.selected_seats; i++){

        // Loop from the first unreserved seat and mark the seats as reserved.
        // Upto the number of seats given by user
        async function updateSeats(){
          const seats = await all_seatModel.updateOne(
              { seat_number: (i+first_seat) },
              { $set: {isReserved: true}}
          );
          return seats;
      };

      updateSeats().then(function(updatedSeats){
        if(updatedSeats){
        } else {
            console.log("No Seats Updated")
          }
        });
      }
    }
    else {
      console.log("All seats are full.")
      res.send(undefined);
    }

    //setTimeout(() => {}, 1000);
    
    //Get All seats
    async function getAllSeats(){
      const seats = await all_seatModel.find().sort({seat_number: 'ascending'})
      return seats;
    };
  
    getAllSeats().then(function(all_seats){
      res.send({first_seat, all_seats});
      }).catch(function(err){
        console.log(err);
      }
    );
  });
});

export { router };
