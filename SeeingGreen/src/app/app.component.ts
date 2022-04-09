import { Component } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { UserService } from './_services';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  alertCont: AlertController;
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

  showScore = false;

  userSubscription: Subscription;
  
  constructor(private userService: UserService) {
    this.userSubscription = this.userService.onStatus().subscribe(status => {
      this.decisions = status;
    })
    this.showCards = 0;
    this.showScore = false;
  }

  public async counter(x: number){
    this.score += x;
  }

  public async start(ev: any){
    this.showAlert();    
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
    this.nextQ(id);
  }

  public async nextQ(id: number){ 
    if (this.followingQNum[id] == -1) {
      this.showScore = true;
      this.showCards = 2;
    } else {
    this.qNumber += 1;
    this.userService.sendStatus(this.decisions.concat(id))
    this.testId = this.followingQNum[id]
    }
  }

  async showAlert() {

    const alert = await this.alertCont.create({
      header: 'Alert',
      subHeader: 'Howdy Yall',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  };

  

} 
