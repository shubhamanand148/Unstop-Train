import mongoose from 'mongoose';

//----------------------------- Schema and Model -----------------------------//

const all_seatSchema = new mongoose.Schema({
  seat_number: Number,
  isReserved: Boolean,
});

const all_seatModel = mongoose.model('Unstop_train_all_seat', all_seatSchema);

// export { selected_seatModel, all_seatModel };
export { all_seatModel };
