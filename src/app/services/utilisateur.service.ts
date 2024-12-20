import { Injectable } from '@angular/core';
import { AuthentificationResponse } from '../model/authentification-response';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../model/utilisateur';
import { Connexion } from '../model/connexion';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl : string=environment.domain;
  //private apiUrl:string=environment.securite;
  public vider !: AuthentificationResponse;
  public userConnecte : Observable<AuthentificationResponse>;
  private userConnecteSubject : BehaviorSubject<AuthentificationResponse>;
  constructor(private http : HttpClient) { 
    this.userConnecteSubject= new BehaviorSubject<AuthentificationResponse>(JSON.parse(sessionStorage.getItem('userConnecte') as string));
    this.userConnecte=this.userConnecteSubject.asObservable();
            
  }

  createUser(user:Utilisateur):Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/utilisateur/create`, user);
  }

  getListeUser():Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/utilisateur/all`)
  }

  find(id:number):Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${this.apiUrl}/utilisateur/${id}`)
  }

  update(id:number, user:Utilisateur):Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/utilisateur/update/${id}`,user)
  }

  createPassword(id:number,user:Utilisateur):Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/utilisateur/createpassword/${id}`,user)
  }

  userLogin(user : Connexion):Observable<AuthentificationResponse>{

   /*  console.log("login ", user)
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ window.btoa(user.username+':'+user.password),
    } */
    return this.http.post<AuthentificationResponse>(`${this.apiUrl}/utilisateur/authentifier`,user)
  .pipe(map(reuslt=>{
      sessionStorage.setItem('userConnecte', JSON.stringify(reuslt));      
     // sessionStorage.setItem('token',String(reuslt.token));
      sessionStorage.setItem('login',String(reuslt.user?.username));
      //this.userConnecteSubject.next(reuslt);
      //this.setUserName(String(reuslt.user?.nomUtilisateur));
      return reuslt;
    }))
  }

  userLogout():Observable<String>{    
    return this.http.get<String>(`${this.apiUrl}/utilisateur/logout`);
  }

  getUserConnectee():AuthentificationResponse{
    return this.userConnecteSubject.value;
  }

  setUserName(userName: string){
    sessionStorage.setItem('userName', JSON.stringify(userName));
  }
  

  getUserName(){
    return JSON.parse(sessionStorage.getItem('userName') as string)
  }

  public getCurrentSession(){
    return sessionStorage;
  }

  viderCache(){
    this.userConnecteSubject.next(this.vider);
  }

  motDePasseOublier(login:string):Observable<string>{
    return this.http.get<string>(`${this.apiUrl}/utilisateur/changepassword/${login}`);
  }

}
