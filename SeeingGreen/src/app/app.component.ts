import { Component } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { UserService } from './_services';

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
  decisions: Array<number> = [];

  userSubscription: Subscription;
  
  constructor(private userService: UserService) {
    this.userSubscription = this.userService.onStatus().subscribe(status => {
      this.decisions = status;
    })
  }

  public async counter(x: number){
    this.score += x;
  }

  public async start(ev: any){
    this.score = 0;
    this.set = 0;
    this.show = false;
    this.showCards = true;
    this.userService.sendStatus([])
  }

  public async restart(ev: any){
    this.score = 0;
    this.set = 0;
    this.show = true;
    this.showCards = false;
    this.userService.sendStatus([])
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
    this.userService.sendStatus(this.decisions.concat(id))
    this.set = id
  }
}
