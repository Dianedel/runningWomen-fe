import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss'],
  // template: `<div (click)="redirect()">Redirect</div>`,
  // providers: [ROUTER_PROVIDERS]
})

export class GooglemapsComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  myAutocomplete: google.maps.places.Autocomplete;
  latitude: number;
  longitude: number;
  @ViewChild('address') addressElement: any;


  setCenter(e:any){
    e.preventDefault();
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
  }
  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId);
  }

  constructor() { }

  ngOnInit(){

    // var coureuses = {
      //   "Sandra Nicouette":{"lat": 48.827439, "lon": 2.330042},
      //   "Anne Halliz":{"lat": 48.853183, "lon": 2.369144},
      // };

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

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(48.87167549999999, 2.3109905999999683),
    title: "Hello Nadia",
    map: this.map
  });

  google.maps.event.addListener(marker, 'click', function() {

    // alert("La souris est passée par là... 💕");
  });

  }
}


