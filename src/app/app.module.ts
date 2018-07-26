import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

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
import { AddPhotoComponent } from './add-photo/add-photo.component';

const routesArray: Routes = [
  // Home Page
  { path: "home-page", component: RunComponent },
  // Profil-reglage privé de l'utilisateur
  { path: "reglage", component: ReglageComponent },
  // Page recherche Maps
  { path: "map", component: GooglemapsComponent },
// Profil public utilisateur
  { path: "profil/:id", component: ProfilComponent },
  // upload photo
  { path: "info", component: AddPhotoComponent },
  // mailbox
  { path: "mail", component: MessagerieComponent },
  { path: "mail/:id", component: MessagerieComponent },
  // Signup
  { path: "signup", component: SignupComponent },
  // Login 1ERE PAGE
  { path: "", component: LoginComponent },
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
    AddPhotoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routesArray),
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
