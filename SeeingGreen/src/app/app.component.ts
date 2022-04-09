import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  show: boolean = true;


  constructor() {}

  public async buttonPress(ev: any){
    this.show = !this.show;
  }

}
