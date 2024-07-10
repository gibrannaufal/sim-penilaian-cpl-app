import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  profile: any
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }
  getRoles() {
    this.authService.getProfile().subscribe((user: any) => {
      this.profile = user;
      console.log(this.profile);
      
    });
  }

}
