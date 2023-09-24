import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPipe } from './search.pipe';
import { FormsModule } from '@angular/forms';
import { AddNewAliasComponent } from './add-new-alias/add-new-alias.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    AddNewAliasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
