import { Component } from '@angular/core';

export type Alias={
  name:string,
  text:string
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public searchText:string ="";
  public aliases:Array<Alias> = [];
  constructor(){
    const _aliases = localStorage.getItem("aliases")
    if(_aliases){
      this.aliases = JSON.parse(_aliases);
    }
  }
  
}
