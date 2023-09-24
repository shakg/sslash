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
  public copySuccess: any = {};
  constructor(){
    const _aliases = localStorage.getItem("aliases")
    if(_aliases){
      this.aliases = JSON.parse(_aliases);
    }
  }

  confirmCopyToClipboard(alias:any){
    navigator.clipboard.readText().then((clipboardText:string)=>{
      if(alias.text === clipboardText){
        this.copySuccess[alias.name] = true;
        setTimeout(()=>{
          this.copySuccess[alias.name] = false;
        },500)
      }else{
        this.copySuccess[alias.name] = false;
      }
    })
  }
  
}
