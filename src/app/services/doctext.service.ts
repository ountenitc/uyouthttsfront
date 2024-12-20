import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { Doctext } from '../model/doctext';
import { environment } from '../../environments/environment.development';
import { LoaderService } from './loader.service';
import { Traduction } from '../model/traduction';
import { Audio } from '../model/audio';

@Injectable({
  providedIn: 'root'
})
export class DoctextService {

  public usersUrl: string=environment.domain;
  private id :number=0;
  private totalRequests = 0;

  constructor(private http: HttpClient,private loadingService: LoaderService) {
    //this.usersUrl = 'http://localhost:8081/rigo/doctext';
  }
  public findAll(): Observable<Doctext[]> {
    return this.http.get<Doctext[]>(`${this.usersUrl}/doctext/all`);
  }

  public find(id:number): Observable<Doctext[]> {
    return this.http.get<Doctext[]>(`${this.usersUrl}/doctext/${id}`);
  }

  public create(doctext: Doctext):Observable<Doctext> {
    return this.http.post<Doctext>(`${this.usersUrl}/doctext/create`, doctext);
  } 

  public update(id:number,doctext: Doctext):Observable<Doctext> {
    return this.http.post<Doctext>(`${this.usersUrl}/doctext/update/${id}`, doctext);
  } 

  public delete(id:number) {
    return this.http.delete(`${this.usersUrl}/doctext/delete/${id}`);
  } 
  
public traduire(textfr: String) :Observable<Traduction>{   
  return this.http.post<Traduction>(`${this.usersUrl}/util/traduiretext`, textfr);
}

public lireTexte(texte:String):Observable<Audio>{
  this.totalRequests++;
  this.loadingService.setLoading(true);
  return this.http.post<Audio>(`${this.usersUrl}/util/genereraudio`, texte).pipe(
    finalize(() => {
      this.totalRequests--;
      if (this.totalRequests == 0) {
        this.loadingService.setLoading(false);
      }
    })
  );
}

}
