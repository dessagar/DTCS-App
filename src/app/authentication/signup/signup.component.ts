import { Component } from '@angular/core';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user: any = {
    name: '',
    email: '',
    username: '',
    password: 'user@123',
    role: 'employee', // default role
  };
  signupSuccess = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signup(): void {
    this.authService.signup(this.user).subscribe(
      (data) => {
        // Handle success
        this.signupSuccess = true;
      },
      (error) => {
        // Handle error
      }
    );
  }
}
