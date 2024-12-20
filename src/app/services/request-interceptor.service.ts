import { Injectable } from '@angular/core';
import { UtilisateurService } from './utilisateur.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor(private apiUser : UtilisateurService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{ 

       let token=sessionStorage.getItem('token');
        if(!token){
          //const req_params = new HttpParams({encoder: new CustomEncoder()});
          req=req.clone({
            headers: req.headers.set('Authorization',String(sessionStorage.getItem("token"))),
                                /* .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                                .set("access-control-expose-headers", "mintargetapiversion")
                                .set("Access-Control-Allow-Origin", "*")
                                .set("Access-Control-Allow-Methods"," PUT,GET,POST,DELETE") 
                                .set('login',String(sessionStorage.getItem('login')))*/
                                
            params:req.params.append('user',String(sessionStorage.getItem('login')))
            //params:new HttpParams({encoder: new CustomEncoder(),fromString: req.params.toString()})
                                  })

        }

        
        return next.handle(req)
        
  }
}
