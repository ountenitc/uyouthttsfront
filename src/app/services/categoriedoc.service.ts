import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoriedoc } from '../model/categoriedoc';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriedocService {
  private usersUrl: string=environment.domain;

  constructor(private http: HttpClient) {
   // this.usersUrl = 'http://localhost:8081/rigo/categoriedoc';
  }
  public findAll(): Observable<Categoriedoc[]> {
    return this.http.get<Categoriedoc[]>(`${this.usersUrl}/categoriedoc/all`);
  }

  public find(id:number): Observable<Categoriedoc> {
    return this.http.get<Categoriedoc>(`${this.usersUrl}/categoriedoc/${id}`);
  }

   public create(categoriedoc: Categoriedoc) {
    return this.http.post<Categoriedoc>(`${this.usersUrl}/categoriedoc/create`, categoriedoc);
  } 

  public update(id:number, categoriedoc: Categoriedoc) {
    return this.http.put<Categoriedoc>(`${this.usersUrl}/categoriedoc/update/${id}`, categoriedoc);
  } 

  public delete(id:number) {
    return this.http.delete(`${this.usersUrl}/categoriedoc/delete/${id}`);
  } 
}
