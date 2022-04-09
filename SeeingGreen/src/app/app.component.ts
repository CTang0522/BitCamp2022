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
  set: number = 0;

  
  constructor() {}

  public async counter(x: number){
    this.score += x;
  }

  public async start(ev: any){
    this.score = 0;
    this.set = 0;
    this.show = false;
    this.showCards = true;
  }

  public async restart(ev: any){
    this.score = 0;
    this.set = 0;
    this.show = true;
    this.showCards = false;
  }

  public async buttonPress(ev: any){
    this.show = !this.show;
    this.showCards = !this.showCards;
  }

  public async choice(ev: any, value: number, id: number){
    this.counter(value);
    this.nextQ(id);
  }

  public async nextQ(id: number){
    this.set = id;
  }
}
