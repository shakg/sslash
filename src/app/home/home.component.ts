import { Component } from '@angular/core';
import { IpcRenderer } from 'electron';
import { NotificationService } from '../notification.service';
import { Alias } from '../../../libs/shared/types/alias';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public searchText: string = "";
  public aliases: Array<Alias> = [];

  // TODO: write proper types
  public copySuccess: any = {};
  private _ipc: IpcRenderer | undefined;


  constructor(private notificationService:NotificationService) {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
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
  confirmCopyToClipboard(alias: Alias) {
    this.notificationService.info("Copied text!");
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

  deleteAlias(alias: Alias) {
    try {
      const aliases = this.getAlisesFromLocalStorage();
      const newAliases = aliases.filter((x:Alias) => x.name !== alias.name);
      localStorage.setItem("aliases", JSON.stringify(newAliases));
      this.aliases = this.getAlisesFromLocalStorage();
      this.notificationService.info("Deleted alias");
    } catch (error) {
      this.notificationService.error("Something bad happened during delete operation! Please try again.")
    }
  }

  openInBrowser(alias:Alias){
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if(urlRegex.test(alias.text)){
      this._ipc?.send('open-in-browser', alias.text);
    }
  }
}
