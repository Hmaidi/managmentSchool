import { HttpInterceptorFn } from "@angular/common/http";
import { Inject, inject, Injector } from "@angular/core";
import { tap } from "rxjs";
import { AuthService } from "./auth.service";


export const authInterceptor: HttpInterceptorFn = (req, next) => {


  console.log('request', req.method, req.url);
  const authService = inject(AuthService);
  let headers = req.headers;

  const authToken = authService.getToken();

  if (authToken) {
    headers = headers.set('Authorization', `Bearer ${authToken}`);
  }

  req = req.clone({ headers });

  return next(req).pipe(
    tap(resp => console.log('response', resp))
  );

}


