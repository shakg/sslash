import { Component,OnInit } from '@angular/core';
import { Alias } from '../../../../libs/shared/types/alias';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-add-new-alias',
  templateUrl: './add-new-alias.component.html',
  styleUrls: ['./add-new-alias.component.css']
})
export class AddNewAliasComponent implements OnInit {
  
  public name?:string = "";
  public text?:string = "";

  constructor(private route:ActivatedRoute, private notificationService:NotificationService){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      const _name = params['name']; 
      console.log("🚀 ~ file: add-new-alias.component.ts:20 ~ AddNewAliasComponent ~ ngOnInit ~ _name:", _name)
      const aliases:Array<Alias> = JSON.parse(localStorage.getItem("aliases")!);
      console.log("🚀 ~ file: add-new-alias.component.ts:22 ~ AddNewAliasComponent ~ ngOnInit ~ aliases:", typeof aliases)
      if(_name != undefined || _name !== ""){
        this.name = _name;
        this.text = aliases.find(a=>a.name === _name)?.text;
        console.log("🚀 ~ file: add-new-alias.component.ts:26 ~ AddNewAliasComponent ~ ngOnInit ~ this.text:", this.text)
      }
    });
  }

  saveNewAlias() {
    if (!this.name || !this.text) {
      return;
    }
  
    const alias: Alias = {
      name: this.name,
      text: this.text
    };
  
    let aliases: Alias[] = JSON.parse(localStorage.getItem("aliases") || "[]");
  
    const existingAlias = aliases.find(_alias => _alias.name === this.name);
  
    if (existingAlias) {
      existingAlias.text = this.text;
      this.notificationService.info(`Alias for "${this.name}" has been overwritten!`);
    } else {
      aliases.push(alias);
      this.notificationService.info(`Alias for "${this.name}" has been saved!`);
    }
  
    localStorage.setItem("aliases", JSON.stringify(aliases));
  }
}
