import { Component, OnInit, NgZone } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { RouterLink, Router } from '@angular/router';
import { AuthService, User } from '../api/auth.service';
import { Mail, MailService } from '../api/mail.service';
import { MarkersService, Marker } from '../api/markers.service';

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss'],

})

export class GooglemapsComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  myAutocomplete: google.maps.places.Autocomplete;
  latitude: number;
  longitude: number;
  zoom: number;
  @ViewChild('address') addressElement: any;


  setCenter(){
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
  }
  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId);
  }

  constructor(
    public myAuthServ: AuthService,
    private myMailServ: MailService,
    private myRouterServ: Router,
    public myMarkerServ: MarkersService,
    private myZone: NgZone,
  ) { }

  ngOnInit(){
    this.myAuthServ.check()
      .then(() => {
        const [lng, lat] = this.myAuthServ.currentUser.coordinates;
        this.latitude = lat;
        this.longitude = lng;
        this.setCenter();
        this.zoom = 15;
      })
      .catch(() => {
        alert("Gmaps n'arrive pas à se centrer sur votre position")
      });


    this.fetchMarkers();

      var mapProp = {
        center: new google.maps.LatLng(48.8718722, 2.3176432000000204),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

      this.myAutocomplete = new google.maps.places.Autocomplete(this.addressElement.nativeElement);

      this.myAutocomplete.addListener('place_changed',() => {
        var location = this.myAutocomplete.getPlace()
      this.map.setCenter(location.geometry.location);
    // pour envoyer les infos au backend
    // console.log(location)
  });
  }
    // this.myAuthServ.currentUser.coordinates = new google.maps.LatLng

// Marqueur et infobulle
  // function createMarker(location, locations) {
  //   var marker = new google.maps.Marker({
  //     position: {lat: parseFloat(locations[location].lat), lng: parseFloat(locations[location].lon)},
  //     title: locations[location].nameLocation,
  //     // "{{user.firstName.lastName}}",
  //     map: this.map
  //   });

  //   var popup = new google.maps.InfoWindow({
  //     content: locations[location].nameLocation,
  //     // "{{user.firstName.lastName}}",
  //     // maxWidth: 300,
  //     // maxHeight: 100,
  //   });
  //   google.maps.event.addListener(marker, "click", function() {
  //     if (currentPopup != null) {
  //       currentPopup.close();
  //       currentPopup = null;
  //     }
  //     popup.open(this.map, marker);
  //     currentPopup = popup;
  //   });
  //   google.maps.event.addListener(popup, "closeclick", function() {
  //     currentPopup = null;
  //   });
  // }


  // var marker = new google.maps.Marker({
  //   position: new google.maps.LatLng(user.coordinates[1], user.coordinates[0]),
  //   title: `${user.lastName} ${user.firstName}`,
  //   map: this.map
  // });

  // google.maps.event.addListener(marker, 'click', function() {
  //   res.renderrouterLink="/profil";
  // });




  fetchMarkers() {
    console.log("hello");
    this.myMarkerServ.getMarkers()
    .then((response : Array<Marker>) => {
      console.log(response);
      response.forEach(mark => {
        console.log('mark', mark)
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(mark.coordinates[1], mark.coordinates[0]),
          animation: google.maps.Animation.DROP,
          title: `${mark.firstName} ${mark.lastName}`,
          map: this.map
        });

        marker.addListener("click", () => {
          this.myZone.run(() => {
            this.myRouterServ.navigateByUrl(`/profil/${mark._id}`);
          });
        });
      })
    })
    .catch((err) => {
      alert("il y a un souci")
      console.log(err);
    });
  }

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


}


