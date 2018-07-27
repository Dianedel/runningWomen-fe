import { Component, OnInit } from '@angular/core';
import { Mail, MailService } from '../api/mail.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, User, MessageSubmission } from '../api/auth.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss']
})
export class MessagerieComponent implements OnInit {
  newMessage: MessageSubmission = new MessageSubmission();
  mailbox: Array<Mail>;
  id: string;

  constructor(
    public myAuthServ: AuthService,
    private myMailServ: MailService,
    private myRouterServ: Router,
    private myActivated: ActivatedRoute
  ) { }

  ngOnInit() {
    this.myActivated.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.fetchMessagerieDetails();
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

  submitForm(myForm) {
    console.log(myForm);
  }

  sendSubmit() {
   // console.log(this.newMessage)
    // pass the form inputs to the service
    this.newMessage.receiver = this.id;
    this.myAuthServ.postMessage(this.newMessage)
    .then((response: AuthService) => {
      // redirect away to the "mon compte" page
      this.fetchMessagerieDetails();
    })
    .catch((err) => {
      alert("Erreur lors de l'envoi du message.");
      console.log(err);
    });
  }




}
