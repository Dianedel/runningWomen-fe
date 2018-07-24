import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SignupSubmission } from '../api/auth.service';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: SignupSubmission = new SignupSubmission();
 // @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;
  myAutocomplete: google.maps.places.Autocomplete;
  // latitude: number;
  // longitude: number;
  @ViewChild('address') addressElement: any;
  //@ViewChild("latitude") adressElement: any;

  constructor(
    public myAuthServ: AuthService,
    private myRouterServ: Router
  ) { }

  ngOnInit(){

    // var currentPopup = null;

      this.myAutocomplete = new google.maps.places.Autocomplete(this.addressElement.nativeElement);

      this.myAutocomplete.addListener('place_changed',() => {
        var suggest = this.myAutocomplete.getPlace();
        var { location } = suggest.geometry;
       // console.log(location)

       this.signupForm.coordinates = [ location.lng(), location.lat() ];
       this.signupForm.location = `${suggest.name}, ${suggest.vicinity}`;
    // pour envoyer les infos au backend
    // console.log(this.signupForm)
  });
  }

submitForm(myForm) {
  console.log(myForm);
}

  signupSubmit() {
    console.log(this.signupForm)
    // pass the form inputs to the service
    this.myAuthServ.postSignup(this.signupForm)
    .then((response) => {
      // redirect away to the "mon compte" page
      this.myRouterServ.navigateByUrl("/reglage");
    })
    .catch((err) => {
      alert("Souci d'inscription.");
      console.log(err);
    });
  }
}
