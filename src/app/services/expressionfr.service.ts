import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expressionfr } from '../model/expressionfr';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExpressionfrService {
  private usersUrl: string=environment.domain;

  constructor(private http: HttpClient) {
   // this.usersUrl = 'http://localhost:8081/rigo/motexpressionfr';
  }
  public findAll(): Observable<Expressionfr[]> {
    return this.http.get<Expressionfr[]>(`${this.usersUrl}/motexpressionfr/all`);
  }

  public find(id:number): Observable<Expressionfr> {
    return this.http.get<Expressionfr>(`${this.usersUrl}/motexpressionfr/${id}`);
  }

  public craete(expressionfr: Expressionfr) {
    console.log(expressionfr.idalph?.lettre)
    return this.http.post<Expressionfr>(`${this.usersUrl}/motexpressionfr/create`, expressionfr);
  } 

  public update(id: number,expressionfr: Expressionfr) {
    return this.http.put<Expressionfr>(`${this.usersUrl}/motexpressionfr/update/${id}`, expressionfr);
  } 
}
