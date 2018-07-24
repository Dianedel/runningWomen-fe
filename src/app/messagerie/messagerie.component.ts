import { Component, OnInit } from '@angular/core';
import { Mail, MailService } from '../api/mail.service';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss']
})
export class MessagerieComponent implements OnInit {
  mailbox: Array<Mail>;

  constructor(
    public myAuthServ: AuthService,
    private myMailServ: MailService,
    private myRouterServ: Router,
  ) { }

  ngOnInit() {
    this.fetchMessagerieDetails();
  }

  fetchMessagerieDetails() {
    this.myMailServ.getMail()
    .then((response : Array<Mail>) => {
      this.mailbox = response;
    })
    .catch((err) => {
      alert("il y a un souci")
      console.log(err);
    });
  }

  deleteClick() {
    const isOkay = confirm("Supprimer ce mail ?");

    if (isOkay) {
      this.myMailServ.deleteMail(this) //this.id
      .then(() => {
        this.myRouterServ.navigateByUrl("/mails/:id");
      })
      .catch((err) => {
        alert("Le message n'a pas pu être supprimé.")
        console.log(err);
      })
    }
  }
}
