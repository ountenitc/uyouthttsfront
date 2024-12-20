import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Langue } from '../model/langue';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LangueService {
  private usersUrl: string=environment.domain;

  constructor(private http: HttpClient) {
    //this.usersUrl = 'http://localhost:8081/rigo/langue';
  }

  public findAll(): Observable<Langue[]> {
    return this.http.get<Langue[]>(`${this.usersUrl}/langue/all`);
  }

  public create(langue: Langue) {
    return this.http.post<Langue>(`${this.usersUrl}/langue/create`, langue);
  }

  public find(id:number): Observable<Langue> {
    return this.http.get<Langue>(`${this.usersUrl}/langue/${id}`);
  }

  public delete(id:number): Observable<Langue> {
    return this.http.delete<Langue>(`${this.usersUrl}/langue/delete/${id}`);
  }

  public update(id:number,langue: Langue) {
    return this.http.post<Langue>(`${this.usersUrl}/langue/update/${id}`, langue);
  }
}
