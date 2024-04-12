import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { Token } from '@angular/compiler';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMessage: Array<string> = [];


  constructor(private router: Router, private authService: AuthenticationService, private tokenService: TokenService ) {
    
  }

  login() {
    this.errorMessage = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMessage = err.error.validationErrors
        } else {
          this.errorMessage.push(err.error.message);
        }
      }
    })
  }

  register() {
    this.router.navigate(['register']);
  }
}