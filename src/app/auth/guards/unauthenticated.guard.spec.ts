import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { unauthenticatedGuard } from './unauthenticated.guard';

describe('unauthenticatedGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unauthenticatedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
