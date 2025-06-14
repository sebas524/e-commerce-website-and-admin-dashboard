import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);

  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  myForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.hasError.set(true);
      this.myForm.markAllAsTouched;
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);

      return;
    }
    console.log(this.myForm.value);
    const { email = '', password = '' } = this.myForm.value;

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      console.log(isAuthenticated);

      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });

    this.myForm.reset({
      email: '',
      password: '',
    });

    // todo: check authentication
    // todo: register
    // todo: logout
  }
}
