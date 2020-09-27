import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ProgressIndicatorService } from './progress-indicator.service';

//Angular interceptors
@Injectable({
  providedIn: 'root'
})
export class ProgressIndicatorInterceptor implements  HttpInterceptor{

  constructor(private services:ProgressIndicatorService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
          .pipe(
                tap(value =>this.services.show()),
                finalize(()=>this.services.hide())
          );
    throw new Error('Method not implemented.');
  }

}
