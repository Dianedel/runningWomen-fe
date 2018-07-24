import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './auth.service';

const backendUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private myHttpServ: HttpClient
  ) { }

  // GET /api/mail
getMail() {
  return this.myHttpServ
  .get(
    `${backendUrl}/api/mailbox`,
    { withCredentials: true } //send cookies across domains
  )
  .toPromise();
}
  // GET /api/markers
  // getMarkers() {
  //   return this.myHttpServ
  //   .get(
  //     `${backendUrl}/api/markers`,
  //     {withCredentials: true } //send cookies across domains
  //   )
  //   .toPromise();
  // }

//DELETE /api/mail/:id
deleteMail(id) {
  return this.myHttpServ
  .delete(
    `${backendUrl}/api/mailbox/${id}`,
    { withCredentials : true } // send cookies across domains
  )
  .toPromise();
}

// POST /api/mail/:id
postMail(mailInfo : MailSubmission) {
  return this.myHttpServ
  .post(
    `${backendUrl}/api/mailbox`,
    mailInfo,
    { withCredentials: true } //send cookies across domains
  )
  .toPromise();
  }
}

export class Mail {  //class mail ou Mailbox?
  _id: string;
  sender: User;
  receiver: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export class MailSubmission {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
}