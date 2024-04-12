import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models/registration-request';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = { email: '', firstName: '', lastName: '', password: '' };
  errorMessage: Array<string> = [];

  constructor( private authService: AuthenticationService, private router: Router) {
    
  }

  register() {
    this.errorMessage = [];
    this.authService.register( { 
      body: this.registerRequest
    }).subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        this.errorMessage = err.error.validationErrors;
      }
    })
  }

  login() {
    this.router.navigate(['login']);
  }

}
