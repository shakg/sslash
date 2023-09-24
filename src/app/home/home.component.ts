import { Component } from '@angular/core';

export type Alias = {
  name: string,
  text: string
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public searchText: string = "";
  public aliases: Array<Alias> = [];
  public copySuccess: any = {};
  constructor() {
    this.aliases = this.getAlisesFromLocalStorage();
  }

  getAlisesFromLocalStorage() {
    const _aliases = localStorage.getItem("aliases")
    if (_aliases) {
      return JSON.parse(_aliases);
    }
  }
  confirmCopyToClipboard(alias: any) {
    navigator.clipboard.readText().then((clipboardText: string) => {
      if (alias.text === clipboardText) {
        this.copySuccess[alias.name] = true;
        setTimeout(() => {
          this.copySuccess[alias.name] = false;
        }, 1500)
      } else {
        this.copySuccess[alias.name] = false;
      }
    })
  }

  deleteAlias(alias: any) {
    const aliases = this.getAlisesFromLocalStorage();
    const newAliases = aliases.filter((x: any) => x.name !== alias.name);
    console.log("🚀 ~ file: home.component.ts:44 ~ HomeComponent ~ deleteAlias ~ newAliases:", newAliases)
    localStorage.setItem("aliases", JSON.stringify(newAliases));
    this.aliases = this.getAlisesFromLocalStorage();
  }

}
