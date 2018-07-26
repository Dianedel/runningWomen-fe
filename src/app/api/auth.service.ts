import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { environment } from "../../environments/environment";
// const { backendUrl } = environment;

const backendUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor(
    private myHttpServ: HttpClient
  ) { }


  // Get user profil
getUserItem(id) {
  return this.myHttpServ
  .get(
    `${backendUrl}/api/auth/${id}`,
    { withCredentials: true }
  )
  .toPromise();
}

  // GET /api/checklogin
  check() {
    return this.myHttpServ
    .get(
      `${backendUrl}/api/checklogin`,
      { withCredentials: true } // send cookies across domains
    )
    .toPromise()
    .then((response: any) => {
      // update "currentUser" to match what the backend reports
      this.currentUser = response.userDoc;
      return response;
    });
  }

  // POST /api/login
  postLogin(loginInfo: LoginSubmission) {
    return this.myHttpServ
    .post(
      `${backendUrl}/api/login`,
       loginInfo,
       { withCredentials: true } // send cookies across domains
      )
    .toPromise()
    .then((response: any) => {
      // update "currentUser" if we log in successfully
      this.currentUser = response.userDoc;
      return response;
    });
  }

  // POST /api/signup
  postSignup(signupInfo: SignupSubmission) {
    return this.myHttpServ
    .post(
      `${backendUrl}/api/signup`,
      signupInfo,
      { withCredentials: true } // send cookies across domains
    )
    .toPromise()
    .then((response: any) => {
      // update "currentUser" if we sign up successfully
      this.currentUser = response.userDoc;
      return response;
    });
  }

  // DELETE /api/logout
  logout() {
    return this.myHttpServ
    .delete(
      `${backendUrl}/api/logout`,
      { withCredentials: true }
    )
    .toPromise()
    .then((response: any) => {
      // update "currentUser" if we log out successfully
      this.currentUser = response.userDoc;
      return response;
    });
  }
}

export class User{
  _id: string;
  firstName: string;
  lastName: string;
  // pseudo: string;
  email: string;
  coordinates: number[];
}

export class LoginSubmission {
  email: string;
  loginPassword: string;
}

export class SignupSubmission {
  firstName: string;
  lastName: string;
  birthday: string;
  location: string;
  coordinates: Array<number>;
  // pseudo: string;
  email: string;
  originalPassword: string;
}