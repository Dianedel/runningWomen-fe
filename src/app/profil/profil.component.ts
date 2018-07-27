import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../api/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  id: string;
  userItem: User;

  constructor(
    public myAuthServ: AuthService,
    private myActivatedRouteServ: ActivatedRoute,
    private myRouterServ: Router,
  ) { }

  ngOnInit() {
    this.myActivatedRouteServ.paramMap
    .subscribe((myParams) => {
      this.id = myParams.get("id");
      this.fetchUserProfil();
    });
  }

fetchUserProfil() {
  this.myAuthServ.getUserItem(this.id)
  .then((response: User) => {
    this.userItem = response;
  })
  .catch((err) => {
    alert("il y a un problème avec le profil de la joggeuse")
    console.log(err);
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

  getAge(birth) {
    const ageMS = Date.parse(Date()) - Date.parse(birth);
    const age = new Date();
    console.log(birth, ageMS)
    age.setTime(ageMS);
    const ageYear = age.getFullYear() - 1970;

    return ageYear;
  }
}
