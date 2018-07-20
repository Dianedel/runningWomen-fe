import { Component, OnInit } from '@angular/core';
import { LoginSubmission, AuthService } from '../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-run',
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
      this.myRouterServ.navigateByUrl("/");
    })
    .catch((err) => {
      alert("Sorry! There was a problem with your login. 😥");
      console.log(err);
    });
  }
}
