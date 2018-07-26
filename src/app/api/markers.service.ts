import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './auth.service';

import { environment } from "../../environments/environment";
const { backendUrl } = environment;

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
  _id: string;
  firstName: string;
  lastName: string;
}