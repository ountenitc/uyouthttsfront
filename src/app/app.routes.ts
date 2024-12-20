
import { HomeComponent } from './view/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LangueComponent } from './view/langue/langue.component';
import { NgModule } from '@angular/core';
import { AlertetextComponent } from './view/alertetext/alertetext.component';
import { DoctextComponent } from './view/doctext/doctext.component';
import { ExpressionfrComponent } from './view/expressionfr/expressionfr.component';
import { ExpressionmrComponent } from './view/expressionmr/expressionmr.component';
import { FulltextComponent } from './view/fulltext/fulltext.component';
import { OpinionComponent } from './view/opinion/opinion.component';
import { CategoriedocComponent } from './view/categoriedoc/categoriedoc.component';
import { AlphabetfrComponent } from './view/alphabetfr/alphabetfr.component';
import { AlphabetfrFormComponent } from './form/alphabetfr-form/alphabetfr-form.component';
import { LangueFormComponent } from './form/langue-form/langue-form.component';
import { CategoriedocFormComponent } from './form/categoriedoc-form/categoriedoc-form.component';
import { DoctextFormComponent } from './form/doctext-form/doctext-form.component';
import { ExpressionfrFormComponent } from './form/expressionfr-form/expressionfr-form.component';
import { ExpressionmrFormComponent } from './form/expressionmr-form/expressionmr-form.component';
import { FulltextFormComponent } from './form/fulltext-form/fulltext-form.component';
import { OpinionFormComponent } from './form/opinion-form/opinion-form.component';
import { LoginComponent } from './form/login/login.component';
import { authentificatorGuard } from './services/authentificator.guard';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'', redirectTo:'login', pathMatch:'full'},
    {
        path: "administration", loadChildren:()=>import('./administration/administration.module').then((m)=>m.AdministrationModule)
    },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: true,  useHash: true})],
    exports: [RouterModule]
  })
      export class AppRoutingModule { }