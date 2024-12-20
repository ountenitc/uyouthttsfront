import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expressionmr } from '../model/expressionmr';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExpressionmrService {

  private usersUrl: string=environment.domain;

  constructor(private http: HttpClient) {
    //this.usersUrl = 'http://localhost/rigo/motexpressionmr';
  }
  public findAll(): Observable<Expressionmr[]> {
    return this.http.get<Expressionmr[]>(`${this.usersUrl}/motexpressionmr/all`);
  }

  public find(id:number): Observable<Expressionmr> {
    return this.http.get<Expressionmr>(`${this.usersUrl}/motexpressionmr/${id}`);
  }
  public craete(expressionmr: Expressionmr):Observable<Expressionmr> {
    return this.http.post<Expressionmr>(`${this.usersUrl}/motexpressionmr/create`, expressionmr);
  } 
  public update(id: number,expressionmr: Expressionmr):Observable<Expressionmr> {
    return this.http.put<Expressionmr>(`${this.usersUrl}/motexpressionmr/update/${id}`, expressionmr);
  } 

  public delete(id: number):Observable<String> {
    return this.http.delete<String>(`${this.usersUrl}/motexpressionmr/delete/${id}`);
  } 

}
