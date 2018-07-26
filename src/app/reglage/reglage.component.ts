import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reglage',
  templateUrl: './reglage.component.html',
  styleUrls: ['./reglage.component.scss']
})
export class ReglageComponent implements OnInit {
  // public imageAvatar = require("../img/myAvatar1.png");

  constructor(
    public myAuthServ: AuthService,
    public myRouterServ: Router
  ) {
   }

  ngOnInit() {
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


