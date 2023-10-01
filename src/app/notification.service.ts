import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notificationElement:HTMLElement;
  constructor() {
    const _body:HTMLElement = document.getElementsByTagName("body")[0];
    
    this._notificationElement = document.createElement("div");
    this._notificationElement.style.zIndex = "99";
    this._notificationElement.style.opacity = "0";
    this._notificationElement.style.bottom = "32px";
    this._notificationElement.style.left = "20%";
    this._notificationElement.style.width = "60%";
    this._notificationElement.style.padding = "5px 25px";
    this._notificationElement.style.position = "fixed";
    this._notificationElement.style.color = "white"
    this._notificationElement.style.backgroundColor = "#60a5fa"
    this._notificationElement.style.borderRadius = "5px"
    this._notificationElement.style.transition = "opacity 1s cubic-bezier(0.215, 0.61, 0.355, 1)";

    _body.appendChild(this._notificationElement)
   }

   info(infoMessage:string){
    this._notificationElement.innerText = infoMessage;
    this._notificationElement.style.opacity = "1";
    setTimeout(()=>{
      this._notificationElement.style.opacity = "0";
    },2500)
    
   }

   error(errorMessage:string){
    this._notificationElement.innerText = errorMessage;
    this._notificationElement.style.backgroundColor = "#f87171";
    this._notificationElement.style.opacity = "1";
    setTimeout(()=>{
      this._notificationElement.style.opacity = "0";
    },2500)
   }
}
