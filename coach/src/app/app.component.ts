import { Component } from '@angular/core';
import { seats } from 'seats';
import axios from "axios";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  //Declaring the variables.
  all_seats: seats[];
  first_seat: number;
  isMySeat: boolean;
  showDiv: boolean = false;
  inputValue: FormControl;
  myForm: FormGroup;
  isFull:boolean = false;

  constructor() {

    // Initializing the input validation
    this.inputValue = new FormControl('', [Validators.required, Validators.min(1), Validators.max(7)]);
    this.myForm = new FormGroup({
      inputValue: this.inputValue
    });
  }

  //This will be called when the user submits the form
  onSubmit() {

    //Validating the input
    if (this.myForm.valid) {

      this.all_seats = [];
      this.showDiv = true;

      // Calling the backend.
      axios({
        method: "patch",
        url: "https://unstop-train.onrender.com/seats",
        data: {
          selected_seats: this.inputValue.value
        }
      }).then((data) => {
        console.log()
        if(data.data.first_seat === undefined){
          this.isFull=true
        }else{
          this.first_seat = data.data.first_seat;
          for (let i = 0; i <= 79; i++) {
            this.all_seats.push(data.data.all_seats[i]);
          }
          console.log(this.all_seats);
        }}).catch(function (error) {
        console.log(error);
      });
    }
  }
}