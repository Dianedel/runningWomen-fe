import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './auth.service';

const backendUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  constructor(
    private myHttpServ: HttpClient
  ) { }

  // GET /api/markers
  getMarkers() {
    return this.myHttpServ
    .get(
      `${backendUrl}/api/markers`,
      { withCredentials: true } //send cookies across domains
    )
    .toPromise();
  }
}

export class Marker {
  location: string;
  coordinates: Array<number>;
}