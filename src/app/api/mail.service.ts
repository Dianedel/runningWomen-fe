import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const backendUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private myHttpServ: HttpClient
  ) { }

  // GET /api/mail/:id
getMail(id) {
  return this.myHttpServ
  .get(
    `${backendUrl}/api/mail/${id}`,
    {withCredentials: true } //send cookies across domains
  )
  .toPromise();
}

//DELETE /api/mail/:id
deleteMail(id) {
  return this.myHttpServ
  .delete(
    `${backendUrl}/api/mail/${id}`,
    { withCredentials : true } // send cookies across domains
  )
  .toPromise();
}

// POST /api/mail/:id
postMail(mailInfo : MailSubmission) {
  return this.myHttpServ
  .post(
    `${backendUrl}/api/mail/:id`,
    mailInfo,
    { withCredentials: true } //send cookies across domains
  )
  .toPromise();
  }
}

export class Mail {  //class mail ou Mailbox?
  _id: string;
  sender: string;
  receiver: string;
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