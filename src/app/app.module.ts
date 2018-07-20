import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RunComponent } from './run/run.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { ReglageComponent } from './reglage/reglage.component';
import { ProfilComponent } from './profil/profil.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routesArray: Routes = [
  // Home Page
  { path: "", component: RunComponent },
  // Profil-reglage privé de l'utilisateur
  { path: "reglage/:blahId", component: ReglageComponent },
  // Page recherche Maps
  { path: "maps", component: GooglemapsComponent },
// Profil public utilisateur
  { path: "profil/:blahId", component: ProfilComponent },
  // mailbox
  { path: "mail/:blahId", component: MessagerieComponent },
  // Signup
  { path: "signup", component: SignupComponent },
  // Login
  { path: "login/:blahId", component: LoginComponent },
  //forgot password
  { path: "forgot-password", component: ForgotPasswordComponent },
  // All others URLs
  { path: "**", component: NotfoundpageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RunComponent,
    LoginComponent,
    SignupComponent,
    GooglemapsComponent,
    ReglageComponent,
    ProfilComponent,
    NotfoundpageComponent,
    MessagerieComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routesArray)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
