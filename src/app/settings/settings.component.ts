import { Component, OnInit } from '@angular/core';
import { Alias } from '../../../libs/shared/types/alias';
import { NotificationService } from '../notification.service';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private _ipc: IpcRenderer | undefined;

  ngOnInit(){
    this._ipc?.on("import-aliases-response", (_,aliases:any)=>{
      localStorage.setItem("aliases", JSON.stringify(JSON.parse(aliases)));
    })
  }

  constructor(private noficationService:NotificationService){
     if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }
  export(){
    const aliases:Array<Alias> = JSON.parse(localStorage.getItem("aliases") || "");
    if(aliases.length < 1){
      this.noficationService.error("There is no alias to export!");
    }
    
    this._ipc?.send('export-aliases', aliases);
    this.noficationService.info(`File saved to ${Date.now()}-aliases.json`)
  }

  import(event:any){
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const filePath = selectedFile.path; // Access the file path here
      this._ipc?.send("import-aliases", filePath)
    }else{
      this.noficationService.error("Error happened while selecting file!")
    }
  }
}
