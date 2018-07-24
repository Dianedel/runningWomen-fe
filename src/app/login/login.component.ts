import { Component, OnInit } from '@angular/core';
import { LoginSubmission, AuthService } from '../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: LoginSubmission = new LoginSubmission();

  constructor(
    public myAuthServ: AuthService,
    public myRouterServ: Router
  ) { }

  ngOnInit() {
  }

  loginSubmit() {
    this.myAuthServ.postLogin(this.loginForm)
    .then((response) => {
      // redirige vers la page MAP après connexion
      this.myRouterServ.navigateByUrl("/map");
    })
    .catch((err) => {
      alert("Il y a un souci avec votre connexion. 😥");
      console.log(err);
    });
  }
}
