import { Component } from '@angular/core';
import { AuthService } from './api/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Running Women 🏃‍';
  constructor(
    public myAuthServ: AuthService
  ) { }

  ngOnInit(){
    this.myAuthServ.check()
    .catch((err) => {
      alert("Il y a un souci avec la connexion")
      console.log(err);
    });
}

  logoutClick() {
    this.myAuthServ.logout()
    .catch((err) => {
      alert("Problème de déconnexion.")
      console.log(err);
    })
  }

}

