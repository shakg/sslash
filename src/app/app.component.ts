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
  public aliases:Array<Alias> = [
    {
      name:"greeting",
      text:"Hello, my name is Ishak from Titra Teknoloji A.Ş"
    },
    {
      name:"greeting 2 ",
      text:"Hello, my name is Ishak2 from Titra Teknoloji A.Ş"
    },
    {
      name:"greeting 3",
      text:"Hello, my name is Ishak3 from Titra Teknoloji A.Ş"
    },
    {
      name:"greeting 4",
      text:"Hello, my name is Ishak4 from Titra Teknoloji A.Ş"
    },
  ]
}
