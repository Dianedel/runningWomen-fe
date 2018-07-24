import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {

  constructor(
    public myAuthServ: AuthService,
    private myActivatedRouteServ: ActivatedRoute,
    private myRouterServ: Router,
  ) { }

  ngOnInit() {
  }

}
