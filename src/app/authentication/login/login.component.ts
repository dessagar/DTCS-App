import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: any = {
    username: '',
    password: '',
    // role: 'employee',
  };
  loginError = false;
  loginSuccess = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    console.log('Login Request Data:', this.user);
  
    this.authService.login(this.user).subscribe(
      (data) => {
        
       
        // const role=this.user.role;
        // console.log('user role is :',role)
        console.log('Login Response Data:', data);

        // Navigate based on user's role
        if (data.role === 'employee') {
      // Navigate to the employee dashboard
             this.router.navigate(['/dashboard']);
        } else if (data.role === 'admin') {
      // Navigate to the admin dashboard
              this.router.navigate(['/Admin_dashboardComponent']);
        }
        this.loginSuccess = true;
      },
      (error) => {
        // Handle error without re-throwing it
        this.loginError = true;
        console.error('Login Error:', error);
      }
    );
  }
  
}
