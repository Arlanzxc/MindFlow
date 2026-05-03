import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('mindflow_token');

  if (!token) {
    return next(req);
  }

  const requestWithToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(requestWithToken);
};

