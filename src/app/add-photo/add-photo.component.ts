import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService, User, UserSubmission } from '../api/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';
const { backendUrl } = environment;

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {
  newPhoto: UserSubmission = new UserSubmission();
  uploader: FileUploader = new FileUploader({
    url: `${backendUrl}/api/photos`
  });

  // newPhoto = {
  //   email: '',
  //   location:'',
  //   speed: 0,
  //   availability: '',
  //   description: '',
  //   // imageUrl: '',
  //   coordinates: [],
  //   // specs: []
  // };

  feedback: string;

myAutocomplete: google.maps.places.Autocomplete;
@ViewChild('address') addressElement: any;

  constructor(
    public myAuthServ: AuthService,
    public myRouterServ: Router,
    private myActivatedRouteServ: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.myAuthServ.check()
      .then(() => {
        this.newPhoto = new UserSubmission(this.myAuthServ.currentUser);
      });

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
    // addSpec(spec) {
    //   this.newPhoto.specs.push(spec);
    // }

    submit() {
      //this.uploader.onBuildItemForm = (item, form) => {
      //   form.append('email', this.newPhoto.email);
      //   form.append('adresse', JSON.stringify(this.newPhoto.coordinates));
      //   form.append('vitesse', this.newPhoto.speed);
      //   form.append('disponibilités', this.newPhoto.availability);
      //   form.append('commentaire', this.newPhoto.description);

      //   form.append('specs', JSON.stringify(this.newPhoto.specs));
      // };

      this.uploader.uploadAll();
    }

    updateProfile() {
      this.myAuthServ.postSubmit(this.newPhoto)
      .then(() => {
        this.myRouterServ.navigateByUrl("/reglage");
      })
      .catch((err) => {
        alert("Erreur d'enregistrement");
        console.log(err);
      });
    }
  }
