import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { Fulltext } from '../model/fulltext';
import { environment } from '../../environments/environment.development';
import { LoaderService } from './loader.service';
import { Traduction } from '../model/traduction';
import { Audio } from '../model/audio';

@Injectable({
  providedIn: 'root'
})
export class FulltextService {

  private usersUrl: string=environment.domain;
  traduireUrl: string=environment.domain;

  private id :number=0;
  private totalRequests = 0;

  constructor(private http: HttpClient,private loadingService: LoaderService) {
   // this.usersUrl = 'http://localhost:8081/rigo/fulltextfrmr';
   // this.traduireUrl = 'http://localhost:8081/rigo/util';
  }
  public findAll(): Observable<Fulltext[]> {
    return this.http.get<Fulltext[]>(`${this.usersUrl}/fulltextfrmr/all`);
  }

  public find(id:number): Observable<Fulltext> {
    return this.http.get<Fulltext>(`${this.usersUrl}/fulltextfrmr/${id}`);
  }
  public create(fulltext: Fulltext) {
    return this.http.post<Fulltext>(`${this.usersUrl}/fulltextfrmr/create`, fulltext);
  }

  public update(id:number,fulltext: Fulltext) {
    return this.http.put<Fulltext>(`${this.usersUrl}/fulltextfrmr/update/${id}`, fulltext);
  }

  public delete(id:number) {
    return this.http.delete(`${this.usersUrl}/fulltextfrmr/delete/${id}`);
  }

  public traduire(textfr: String):Observable<Traduction> {
    console.log(textfr);    
    return this.http.post<Traduction>(`${this.traduireUrl}/util/traduiretext`, textfr);
  }

  public lireTexte(texte:String):Observable<Audio>{
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return this.http.post<Audio>(`${this.traduireUrl}/util/genereraudio`, texte).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
