import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);

  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  myForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
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
    const { fullName = '', email = '', password = '' } = this.myForm.value;

    this.authService
      .register(fullName!, email!, password!)
      .subscribe((isAuthenticated) => {
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
      fullName: '',
      email: '',
      password: '',
    });

    // todo: check authentication
    // todo: register
    // todo: logout
  }
}
