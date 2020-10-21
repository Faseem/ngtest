import { HttpInterceptor, HttpXsrfTokenExtractor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpXsrfInterceptor implements HttpInterceptor{
    constructor(
        private tokenExtractor: HttpXsrfTokenExtractor
    ){}
    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
        req = req.clone({headers:req.headers.set('Access-Controll-Allow-Headers', 'X-XSRF-TOKEN')});
        return next.handle(req);
    }
}