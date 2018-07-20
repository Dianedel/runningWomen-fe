import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
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
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
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
}