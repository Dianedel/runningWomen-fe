import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: '/photos'
  });

  newPhoto = {
    email: '',
    location:'',
    speed: '',
    availability: '',
    description: '',
    // imageUrl: '',
    coordinates: [],
    specs: []
  };

  feedback: string;

myAutocomplete: google.maps.places.Autocomplete;
@ViewChild('address') addressElement: any;

  constructor(
    public myAuthServ: AuthService,
    public myRouterServ: Router
  ) { }

  ngOnInit() {

    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };

    // autocomplete address Gmaps
    this.myAutocomplete = new google.maps.places.Autocomplete(this.addressElement.nativeElement);

    this.myAutocomplete.addListener('place_changed',() => {
      var suggest = this.myAutocomplete.getPlace();
      var { location } = suggest.geometry;
      // console.log(location)

      this.newPhoto.coordinates = [ location.lng(), location.lat() ];
      this.newPhoto.location = `${suggest.name}, ${suggest.vicinity}`;
      // pour envoyer les infos au backend
      // console.log(this.signupForm)
    });

  }

  // logout
  logoutClick() {
    this.myAuthServ.logout()
    .then((response) => {
      this.myRouterServ.navigateByUrl("");
    })
    .catch((err) => {
      alert("Problème de déconnexion.")
      console.log(err);
    })
  }

// add photo
    addSpec(spec) {
      this.newPhoto.specs.push(spec);
    }

    submit() {
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('email', this.newPhoto.email);
        form.append('adresse', JSON.stringify(this.newPhoto.coordinates));
        form.append('vitesse', this.newPhoto.speed);
        form.append('disponibilités', this.newPhoto.availability);
        form.append('commentaire', this.newPhoto.description);

        form.append('specs', JSON.stringify(this.newPhoto.specs));
      };

      this.uploader.uploadAll();
    }



  }
