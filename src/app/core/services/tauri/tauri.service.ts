import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { register } from '@tauri-apps/api/globalShortcut';


@Injectable({
  providedIn: 'root'
})
export class TauriService {

  constructor() {
    register('CommandOrControl+Control+J', () => {
      console.log('Shortcut triggered');
    }).then((x)=>{
      console.log("registered!")
    });
  }

  get isTauri(): boolean {
    return !!(window && window.__TAURI__);
  }

  async callHelloWorld() {
    const text = await invoke('hello_world_command');
    console.log(text);
  }
  
}

