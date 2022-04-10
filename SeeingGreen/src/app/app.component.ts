import { Component } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { UserService, LeaderBoard, ScoreService } from './_services';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  score: number = 0;
  showCards: number = 0;
  decisions: Array<number> = [];
  qNumber = 1;
  testId = 0;
  images = ["empty", "./assets/Vegetarian.png", "./assets/Meat.png", "./assets/Mixed.png", "./assets/Beef.png", "./assets/Pork.jpg", "./assets/Poultry.jpg",
    "./assets/Cooking.jpg", "./assets/Local.png", "./assets/Corporation.png", "./assets/Pepsico.png", "./assets/Kelloggs.jpg", "./assets/Nestle.jpg",
    "./assets/Bus.png", "./assets/Bike_Walk.jpg", "./assets/Electric_Scooter.jpg", "./assets/Electric_Car.jpg", "./assets/Gas_Car.jpg", "./assets/Hybrid_Car.jpg",
    "./assets/5_Minutes.jpg", "./assets/8_Minutes.jpg", "./assets/12_Minutes.jpg", "./assets/Gender.jpg", "./assets/Health.jpg", "./assets/Deforestation.jpg"];
  text = ["empty", "VEGETARIAN", "MEAT", "MIXED", "BEEF", "PORK", "POULTRY", "HOME COOKED", "LOCAL SMALL BUSINESS", "LARGE CORPORATION", "PEPSICO", "KELLOGGS",
    "NESTLE", "UMD BUS", "RUN/WALK/MANUAL BIKE", "ELECTRIC SCOOTER/BIKE", "ELECTRIC", "GAS", "HYBRID", "<6 MINUTES", "6-8 MINUTES", ">8 MINUTES", "GENDER EQUALITY",
    "GOOD HEALTH AND WELL-BEING", "PREVENT DEFORESTATION"];

  //For the id of the selected answer, directs to the location of the next triple of answers to display
  followingQNum = [0, 6, 3, 3, 6, 6, 6, 9, 9, 9, 12, 12, 12, 15, 15, 15, 18, 18, 18, 21, 21, 21, -1, -1, -1];
  questions = ["What did you eat in the past 24 hours?", -1, -1, "What made up the majority of the meat you consumed?", -1, -1, 
    "Where did majority of your meals come from?", -1, -1, "Do you know what corporation owns Doritos, Tropicana, Aunt Jemima, and Aquafina?", 
    -1, -1, "How did you get to class today?", -1, -1, "What kind of car do you or your family own? Answer Electric if none.", 
    -1, -1, "How long was your shower today?", -1, -1, "Which of these are not one of the UN’s Sustainable Development Goals?"];

  points = [0,5,-10,-5,-15,-10,-5,5,5,-5,5,-5,-5,-10,5,-3,0,-10,-5,-5,5,-5,-5,-10,5]

  explanations = []

  leaderboard:Array<LeaderBoard> = []


  showScore = false;

  userSubscription: Subscription;
  scoreSubscription: Subscription;
  
  constructor(private userService: UserService, private alertCont: AlertController, private scoreService: ScoreService) {
    this.userSubscription = this.userService.onStatus().subscribe(status => {
      this.decisions = status;
    })
    this.scoreSubscription = this.scoreService.onStatus().subscribe(status => {
      this.leaderboard = status;
    })
    this.showCards = 0;
    this.showScore = false;
  
  }

  public async counter(x: number){
    this.score += x;
  }

  public async start(ev: any){    
    this.score = 0;
    this.showCards = 1;
    this.userService.sendStatus([])
    this.testId = 0;
    this.qNumber = 1;
  }

  public async restart(ev: any){
    this.score = 0;
    this.showCards = 0;
    this.userService.sendStatus([])
    this.testId = 0;
    this.qNumber = 1;
  }

  public async choice(ev: any, value: number, id: number){
    this.counter(this.points[id]);
    this.showAlert(id);
  }

  public async nextQ(id: number){ 
    if (this.followingQNum[id] == -1) {
      this.showScore = true;
      this.showCards = 2;
      this.userService.sendStatus(this.decisions.concat(id))
      let dt = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }
      const time = new Intl.DateTimeFormat('en-US', options).format(dt)
      let newLeaderBoard: LeaderBoard = {
        date: dt.toDateString() + " " + time,
        score: this.score
      }
      this.scoreService.sendStatus(this.leaderboard.concat(newLeaderBoard))
    } else {
    this.qNumber += 1;
    this.userService.sendStatus(this.decisions.concat(id))
    this.testId = this.followingQNum[id]
    }
  }

  messages = ["Beef produces 6.61 lbs of CO2 per serving, Pork produces 1.72 lbs, and Poultry 1.26 lbs.",
    "CDC recommends a shower take 8 minutes, any less is not hygienic and any more is not sustainable.",
    "Preventing Deforestation, while important, is not one of the UN's 17 named Sustainable Development Goals."];
  async showAlert(id: number) {
    if(id <= 6 && id >=4){
      const alert = await this.alertCont.create({
        header: 'Did you know...',
        message: this.messages[0],
        buttons: [
          {
            text: "Okay",
            handler: () => {
              this.nextQ(id);
            }
          }
        ]      });

      await alert.present(); 
    }
    else if(id <= 21 && id >=19){
      const alert = await this.alertCont.create({
        header: 'Did you know...',
        message: this.messages[1],
        buttons: [
          {
            text: "Okay",
            handler: () => {
              this.nextQ(id);
            }
          }
        ]      });

      await alert.present(); 
    } 
    else if(id <= 24 && id >=22){
      const alert = await this.alertCont.create({
        header: 'Did you know...',
        message: this.messages[2],
        buttons: [
          {
            text: "Okay",
            handler: () => {
              this.nextQ(id);
            }
          }
        ]
      });

      await alert.present(); 
    }
    else {
      this.nextQ(id);
    }

  };



  

} 
