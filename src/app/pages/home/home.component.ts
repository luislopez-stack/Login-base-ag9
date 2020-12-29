import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthFirebaseService, private route: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout();
    this.route.navigateByUrl('login');
  }
}
