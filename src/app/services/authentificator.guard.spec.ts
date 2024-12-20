import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authentificatorGuard } from './authentificator.guard';

describe('authentificatorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authentificatorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
