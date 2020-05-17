import { Injectable, NgModule } from '@angular/core';
import { 
  HttpEvent,  
  HttpInterceptor,
  HttpHandler,
  HttpRequest, 
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpResponse} from '@angular/common/http'
import {Observable} from 'rxjs'   
import {throwError} from 'rxjs'   
import {catchError, tap} from 'rxjs/operators'
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (localStorage.getItem('token') != null) {
         const token = 'Bearer ' + localStorage.getItem('token');
         const tokenRequest = req.clone({
                headers : req.headers.set('Authorization', token)
         });
         return next.handle(tokenRequest).pipe(
            
            tap((event: HttpEvent<any>) => {
               if (event instanceof HttpResponse && (event.status == 200 || event.status === 201 )) {
                  console.info('Sucesso na operação!');
               }
            }) 
         
         ,catchError(this.errorProcessor));
      } else {
         return next.handle(req);
      }
  }

  constructor() { }

  errorProcessor(error: HttpErrorResponse) {
      let errorMessage = 'Erro desconhecido';
      if (error.error instanceof ErrorEvent) {
         console.error(error.error);
         errorMessage = 'Error: ' + error.error.error;
      } else {
          errorMessage = 'Código: ' + error.error.code + '\nMensagem: ' + error.error.error;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
  }
}

@NgModule({
  providers: [{
     provide: HTTP_INTERCEPTORS,
     useClass: HeaderInterceptorService,
     multi: true,
  },
 ],
})
export class HttpInterceptorModule {}


