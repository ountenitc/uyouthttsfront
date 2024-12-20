import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { ReponseOpinion } from '../model/reponse-opinion';
import { Observable, finalize } from 'rxjs';
import { Traduction } from '../model/traduction';
import { Audio } from '../model/audio';

@Injectable({
  providedIn: 'root'
})
export class ReponseOpinionService {

  public usersUrl: string=environment.domain;

  private id :number=0;
  private totalRequests = 0;

  constructor(public http: HttpClient,private loadingService: LoaderService) {
    //this.usersUrl = 'http://localhost:8081/rigo/opinion';
  }

  public findAll(): Observable<ReponseOpinion[]> {
    return this.http.get<ReponseOpinion[]>(`${this.usersUrl}/reponseopinionfrmr/all`);
  }

  public findByOpinion(id:number):Observable<ReponseOpinion[]> {
    return this.http.get<ReponseOpinion[]>(`${this.usersUrl}/reponseopinionfrmr/opinion/${id}`);
  }

  public getOpinion(id:number):Observable<ReponseOpinion>{
    return this.http.get<ReponseOpinion>(`${this.usersUrl}/reponseopinionfrmr/${id}`)
  }

  public update(id:number, element:ReponseOpinion):Observable<ReponseOpinion>{
    return this.http.put<ReponseOpinion>(`${this.usersUrl}/reponseopinionfrmr/update/${id}`, element)
  }

  public delete(id:number){
    return this.http.delete(`${this.usersUrl}/reponseopinionfrmr/delete/${id}`)
  }

  public save(opinion: ReponseOpinion) {
    return this.http.post<ReponseOpinion>(`${this.usersUrl}/reponseopinionfrmr/create`, opinion);
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
