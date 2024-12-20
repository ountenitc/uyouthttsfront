import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { Alphabetfr } from '../model/alphabetfr';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Sort } from '@angular/material/sort';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AlphabetfrService{

  private usersUrl: string=environment.domain;
  constructor(private http: HttpClient) {
    //this.usersUrl = 'http://localhost:8081/rigo/alphabetfr';
  }

 
  public findAll(): Observable<Alphabetfr[]> {
    return this.http.get<Alphabetfr[]>(`${this.usersUrl}/alphabetfr/all`);
  }

  public craete(alphabetfr: Alphabetfr): Observable<Alphabetfr> {
    return this.http.post<Alphabetfr>(`${this.usersUrl}/alphabetfr/create`, alphabetfr);
  }

  public find(id:number): Observable<Alphabetfr> {
    return this.http.get<Alphabetfr>(`${this.usersUrl}/alphabetfr/${id}`);
  }

  public update(id:number,alphabetfr: Alphabetfr) {
    return this.http.put<Alphabetfr>(`${this.usersUrl}/alphabetfr/update/${id}`, alphabetfr);
  }

  public delete(id:number) {
    return this.http.delete(`${this.usersUrl}/alphabetfr/delete/${id}`);
  }
}
