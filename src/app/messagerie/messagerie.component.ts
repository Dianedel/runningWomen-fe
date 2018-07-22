import { Component, OnInit } from '@angular/core';
import { Mail, MailService } from '../api/mail.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss']
})
export class MessagerieComponent implements OnInit {
  id: string;
  mailItem: Mail;

  constructor(
    private myActivatedRouteServ: ActivatedRoute,
    private myMailServ: MailService,
    private myRouterServ: Router,
  ) { }

  ngOnInit() {
    this.myActivatedRouteServ.paramMap
    .subscribe((myParams) => {
      this.id = myParams.get("mailId");
      this.fetchMessagerieDetails();
    });
  }

  fetchMessagerieDetails() {
    this.myMailServ.getMail(this.id)
    .then((response : Mail) => {
      this.mailItem = response;
    })
    .catch((err) => {
      alert("il y a un souci")
      console.log(err);
    });
  }

  deleteClick() {
    const { content } = this.mailItem;
    const isOkay = confirm("Supprimer ce mail ?");

    if (isOkay) {
      this.myMailServ.deleteMail(this.id)
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
