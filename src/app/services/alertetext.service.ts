
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alertetext } from '../model/alertetext';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'     
})
export class AlertetextService {

  private usersUrl: string=environment.domain;

  constructor(private http: HttpClient) {
    //this.usersUrl = 'http://localhost:8081/rigo/alertetext';
  }

  public findAll(): Observable<Alertetext[]> {    
    return this.http.get<Alertetext[]>(`${this.usersUrl}/alertetext/all`);   
  }

  public findById(id:number): Observable<Alertetext> {    
    return this.http.get<Alertetext>(`${this.usersUrl}/alertetext/${id}`);   
  }

  delete(id:number): Observable<String>{
    return this.http.delete<String>(`${this.usersUrl}/alertetext/delete/${id}`)
  }
/*
  public save(alertetext: Alertetext) {
    return this.http.post<Alertetext>(this.usersUrl, alertetext);
  }*/
}
