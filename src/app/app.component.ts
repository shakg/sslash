import { Component } from '@angular/core';

export type Alias={
  name:string,
  text:string
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sslash';
  public searchText:string ="";
  public aliases:Array<Alias> = [];

  constructor(){
    const _aliases = localStorage.getItem("aliases")
    if(_aliases){
      this.aliases = JSON.parse(_aliases);
    }
  }
}
