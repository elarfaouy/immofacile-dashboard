import {HttpInterceptorFn} from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  // const authService = inject(AuthenticationService);
  const whitelistUrls = ['api/auth/login', 'api/auth/register', 'api/auth/refresh-token'];
  let token = localStorage.getItem("access-token");

  if (!whitelistUrls.some(url => req.url.includes(url))) {
    req = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
    });
  }

  return next(req);
  // .pipe(
  //   catchError((error: HttpErrorResponse) => {
  //     if (error.status == 401) {
  //       authService.refreshToken().subscribe();
  //     }
  //
  //     return next(req);
  //   })
  // );
};