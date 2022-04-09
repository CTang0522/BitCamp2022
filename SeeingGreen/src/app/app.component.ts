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
  showCards: boolean = false;
  set: number = 0;
  decisions: Array<number> = [];
  qNumber = 1;
  testId = 0;
  images = ["empty", "./assets/Compost.png", "./assets/Recycling.png"];

  //For the id of the selected answer, directs to the location of the next triple of answers to display
  followingQNum = [];
  questions = ["What did you eat in the past 24 hours?"];

  userSubscription: Subscription;
  
  constructor(private userService: UserService) {
    this.userSubscription = this.userService.onStatus().subscribe(status => {
      this.decisions = status;
    })
    this.showCards = false;
  }

  public async counter(x: number){
    this.score += x;
  }

  public async start(ev: any){
    this.score = 0;
    this.set = 0;
    this.showCards = true;
    this.userService.sendStatus([])
  }

  public async restart(ev: any){
    this.score = 0;
    this.set = 0;
    this.showCards = false;
    this.userService.sendStatus([])
  }

  public async choice(ev: any, value: number, id: number){
    this.counter(value);
    this.nextQ(id);
  }

  public async nextQ(id: number){ 
    this.qNumber += 1;
    this.userService.sendStatus(this.decisions.concat(id))
    this.set = id
    this.testId = id
  }
}
