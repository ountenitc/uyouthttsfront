import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Opinion } from '../model/opinion';
import { Observable, finalize } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoaderService } from './loader.service';
import { Traduction } from '../model/traduction';
import { Audio } from '../model/audio';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  
  public usersUrl: string=environment.domain;
  traduireUrl: string=environment.domain;

  private id :number=0;
  private totalRequests = 0;

  constructor(private http: HttpClient,private loadingService: LoaderService) {
    //this.usersUrl = 'http://localhost:8081/rigo/opinion';
  }

  public findAll(): Observable<Opinion[]> {
    return this.http.get<Opinion[]>(`${this.usersUrl}/opinionfrmr/all`);
  }

  public getOpinion(id:number):Observable<Opinion>{
    return this.http.get<Opinion>(`${this.usersUrl}/opinionfrmr/${id}`)
  }

  public update(id:number, element:Opinion):Observable<Opinion>{
    return this.http.put<Opinion>(`${this.usersUrl}/opinionfrmr/update/${id}`, element)
  }

  public delete(id:number){
    return this.http.delete(`${this.usersUrl}/opinionfrmr/delete/${id}`)
  }

  public save(opinion: Opinion) {
    return this.http.post<Opinion>(`${this.usersUrl}/opinionfrmr/create`, opinion);
}

public traduire(textfr: String):Observable<Traduction> {   
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