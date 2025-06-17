import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.user;

  const isAuthenticated = await firstValueFrom(authService.checkAuthStatus());
  console.log({ isAuthenticated });

  if (user()?.roles.includes('admin')) return true;

  router.navigateByUrl('/');
  return false;
};
