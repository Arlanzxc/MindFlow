import { HttpInterceptorFn } from '@angular/common/http';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const match = document.cookie.match(new RegExp('(^|;\\s*)XSRF-TOKEN=([^;]*)'));
  const token = match ? decodeURIComponent(match[2]) : null;

  if (token) {
    const requestWithCsrf = req.clone({
      setHeaders: {
        'X-XSRF-TOKEN': token
      }
    });
    return next(requestWithCsrf);
  }

  return next(req);
};