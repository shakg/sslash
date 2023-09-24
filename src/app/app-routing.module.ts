import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddNewAliasComponent } from './add-new-alias/add-new-alias.component';

const routes: Routes = [
   // Existing routes
   { path: '', component: AppComponent },
   // Add your new route here
   { path: 'new-alias', component: AddNewAliasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
