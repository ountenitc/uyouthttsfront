import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../view/home/home.component';
import { AlphabetfrComponent } from '../view/alphabetfr/alphabetfr.component';
import { LangueComponent } from '../view/langue/langue.component';
import { AlertetextComponent } from '../view/alertetext/alertetext.component';
import { CategoriedocComponent } from '../view/categoriedoc/categoriedoc.component';
import { DoctextComponent } from '../view/doctext/doctext.component';
import { ExpressionfrComponent } from '../view/expressionfr/expressionfr.component';
import { ExpressionmrComponent } from '../view/expressionmr/expressionmr.component';
import { FulltextComponent } from '../view/fulltext/fulltext.component';
import { OpinionComponent } from '../view/opinion/opinion.component';
import { AlphabetfrFormComponent } from '../form/alphabetfr-form/alphabetfr-form.component';
import { LangueFormComponent } from '../form/langue-form/langue-form.component';
import { CategoriedocFormComponent } from '../form/categoriedoc-form/categoriedoc-form.component';
import { DoctextFormComponent } from '../form/doctext-form/doctext-form.component';
import { ExpressionfrFormComponent } from '../form/expressionfr-form/expressionfr-form.component';
import { ExpressionmrFormComponent } from '../form/expressionmr-form/expressionmr-form.component';
import { FulltextFormComponent } from '../form/fulltext-form/fulltext-form.component';
import { OpinionFormComponent } from '../form/opinion-form/opinion-form.component';
import { NavbarComponent } from '../view/navbar/navbar.component';
import { ReponseOpinionsComponent } from '../view/reponse-opinions/reponse-opinions.component';
import { ReponseFormComponent } from '../form/reponse-form/reponse-form.component';
import { QuestionnaireComponent } from '../view/questionnaire/questionnaire.component';
import { UtilisateurComponent } from '../view/utilisateur/utilisateur.component';
import { UtilisateurFormComponent } from '../form/utilisateur-form/utilisateur-form.component';
import { AlertetextFormComponent } from '../form/alertetext-form/alertetext-form.component';

const routes: Routes = [
  {
    path:"", component:NavbarComponent , children:[      
        {path:'Home', component:HomeComponent},
        {path:'', redirectTo:'Home', pathMatch:'full'},
        {path:'Alphabet', component:AlphabetfrComponent},    
        {path:'Langue', component:LangueComponent},
        {path:'Alerte', component:AlertetextComponent},
        {path:'Categoriedoc', component:CategoriedocComponent},
        {path:'Doctext', component:DoctextComponent},
        {path:'Expressionfr', component:ExpressionfrComponent},
        {path:'Expressionmr', component:ExpressionmrComponent},
        {path:'Fulltext', component:FulltextComponent},
        {path:'Opinion', component:OpinionComponent},
        {path:'Traducteur', component:HomeComponent},
        {path:"ReponseOpinion", component:ReponseOpinionsComponent},
        {path:"questionnaires", component:QuestionnaireComponent},
        {path:"Utilisateur", component:UtilisateurComponent},
        //form add
        {path:'AddAlphabet', component:AlphabetfrFormComponent},
        {path:'AddLangue', component:LangueFormComponent},
        {path:'AddCategoriedoc', component:CategoriedocFormComponent},
        {path:'AddDoctext', component:DoctextFormComponent},
        {path:'AddExpressionfr', component:ExpressionfrFormComponent},
        {path:'AddExpressionmr', component:ExpressionmrFormComponent},
        {path:'AddFulltext', component:FulltextFormComponent},
        {path:'AddOpinion', component:OpinionFormComponent},
        {path:"AddReponseOpinion", component:ReponseFormComponent},
        {path:"AddUtilisateur", component:UtilisateurFormComponent},
        //form update
        {path:'UpdateAlerte/:id', component:AlertetextFormComponent},
        {path:'UpdateAlphabet/:id', component:AlphabetfrFormComponent},
        {path:'UpdateLangue/:id', component:LangueFormComponent},
        {path:'UpdateCategoriedoc/:id', component:CategoriedocFormComponent},
        {path:'UpdateDoctext/:id', component:DoctextFormComponent},
        {path:'UpdateExpressionmr/:id', component:ExpressionmrFormComponent},
        {path:'UpdateFulltext/:id', component:FulltextFormComponent},
        {path:'UpdateOpinion/:id', component:OpinionFormComponent},
        {path:"UpdateReponseOpinion/:id", component:ReponseFormComponent},
        {path:"UpdateUtilisateur/:id", component:UtilisateurFormComponent},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
