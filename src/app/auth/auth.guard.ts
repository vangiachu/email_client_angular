import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { take, skipWhile, map, tap } from 'rxjs';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, segments) => {
  const router: Router = new Router();

  //This map converts the value to type boolean or UrlTree which satisfies the return
  //of the for the function. We had an issue because our signedin$ took nulls or booleans
  return inject(AuthService).signedin$.pipe(
    skipWhile((value) => value === null),
    map((value) => !!value),
    take(1),
    tap((authenticated) => {
      if (!authenticated) {
        router.navigate(['/']);
      }
    })
  );
};
