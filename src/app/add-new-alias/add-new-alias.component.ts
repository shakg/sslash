import { Component } from '@angular/core';

@Component({
  selector: 'app-add-new-alias',
  templateUrl: './add-new-alias.component.html',
  styleUrls: ['./add-new-alias.component.css']
})
export class AddNewAliasComponent {
  public name:string = "";
  public text:string = "";
  saveNewAlias(){
    if(this.name ==="" || this.text === "" || this.name == undefined || this.text == undefined){
      alert("You should fill all the inputs!");
      return;
    }
    const alias = {
      name: this.name,
      text:this.text
    }
    let aliases = localStorage.getItem("aliases");
    if(!aliases){
      localStorage.setItem("aliases", JSON.stringify([alias]))
    }else{
      const aliases_array:Array<any> = JSON.parse(aliases);
      aliases_array.push(alias);
      localStorage.setItem("aliases", JSON.stringify(aliases_array));
      alert(`Saved alias for ${alias.name}`)
    }
  }
}
