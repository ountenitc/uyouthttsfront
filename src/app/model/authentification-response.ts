import { Utilisateur } from "./utilisateur";

export interface AuthentificationResponse {

    token?:string;
    user?:Utilisateur;
}
