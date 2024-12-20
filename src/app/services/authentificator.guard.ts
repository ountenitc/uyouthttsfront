import { CanActivateFn } from '@angular/router';

export const authentificatorGuard: CanActivateFn = (route, state) => {
  return true;
};
