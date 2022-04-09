import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  score: number = 0;
  show: boolean = true;
  showCards: boolean = false;

  
  constructor() {}

  public async counter(x: number){
    this.score += x;
  }

  public async buttonPress(ev: any){
    this.show = !this.show;
    this.showCards = !this.showCards;
  }

  public async compost(ev: any){
    this.counter(5);
  }

  public async recycle(ev: any){
    this.counter(0);
  }

  public async choice(ev: any, value){
    this.counter(value)
  }

}
