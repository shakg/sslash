import { ChangeDetectorRef, Component } from '@angular/core';
import { IpcRenderer } from 'electron';

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
  private _ipc: IpcRenderer | undefined;

  public shellResults: any = {}

  constructor(private cdr:ChangeDetectorRef) {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
        console.log("🚀 ~ file: home.component.ts:25 ~ HomeComponent ~ constructor ~ this._ipc:", this._ipc)
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
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
    localStorage.setItem("aliases", JSON.stringify(newAliases));
    this.aliases = this.getAlisesFromLocalStorage();
  }

  openInBrowser(alias:any){
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if(urlRegex.test(alias.text)){
      this._ipc?.send('open-in-browser', alias.text);
    }
  }
}
