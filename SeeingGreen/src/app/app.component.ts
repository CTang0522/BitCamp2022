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
  score: number = 100;
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
    "HEALTH AND WELL-BEING", "PREVENT DEFORESTATION"];

  //For the id of the selected answer, directs to the location of the next triple of answers to display
  followingQNum = [0, 6, 3, 3, 6, 6, 6, 9, 9, 9, 12, 12, 12, 15, 15, 15, 18, 18, 18, 21, 21, 21, -1, -1, -1];
  questions = ["What did you eat in the past 24 hours?", -1, -1, "What made up the majority of the meat you consumed?", -1, -1, 
    "Where did majority of your meals come from?", -1, -1, "Do you know what corporation owns Doritos, Tropicana, Aunt Jemima, and Aquafina?", 
    -1, -1, "How did you get to class today?", -1, -1, "What kind of car do you or your family own? Answer Electric if none.", 
    -1, -1, "How long was your shower today?", -1, -1, "Which of these are not one of the UN’s Sustainable Development Goals?"];

  points = [0,5,-10,-5,-15,-10,-5,5,5,-5,5,-5,-5,-10,5,-3,0,-10,-5,-5,5,-5,-5,-10,5]

  explanations = ["0","Vegetarian is one of the best dietary plans for sustainability as it requires minimal animal based products.",
    "Consuming only meat requires immense animals to be cultivated and killed.","A mixed meal plan will require animal cultivation but it is not as harmful as a meat only diet.",
    "Beef produces 6.61 lbs of Carbon Dioxide per serving.","Pork produces 1.72 lbs of Carbon Dioxide per serving.",
    "Poultry produces 1.26 lbs of Carbon Dioxide per serving.","Cooking one’s own meals can lead to decreased carbon footprint through less waste water, more ethically sourced ingredients, and less funding for corporations.",
    "Shopping from small local businesses increases your communities economic sustainability through funding smaller businesses and the community members that work there.",
    "Corporations have an immense history of unethically sourcing their ingredients and labor. However, some corporations are better than others so you need to be aware of where your food comes from and their policies.",
    "There are three pillars to Sustainability: Environmental, Social, and Economic Sustainability. This question was added to promote understanding the economic backgrounds of various companies one may be purchasing products from.",
    "The correct answer was Pepsico. There are three pillars to Sustainability: Environmental, Social, and Economic Sustainability. This question was added to promote understanding the economic backgrounds of various companies one may be purchasing products from.",
    " The correct answer was Pepsico. There are three pillars to Sustainability: Environmental, Social, and Economic Sustainability. This question was added to promote understanding the economic backgrounds of various companies one may be purchasing products from.",
    "While carpooling is less impactful in terms of Carbon Dioxide emissions, buses still produce immense emissions perpassenger.",
    "Manually biking, walking, and/or running are some of the most sustainable modes of transportation as emissions are reduced only to those created during production of any materials used (ie. Shoes, Tires, etc.)",
    "While more sustainable than buses, these products still require energy to run which can come from one of many potential sources. Some of these can be environementally friendly (Solar, Wind, etc.), however some may not be (Coal, Oil)",
    "Electric vehicles are the newest most environmentally friendly versions of motor vehicles as they produce less Carbon Dioxide emissions over their lifespan.",
    "Gas powered cars rely on the burning of fuel which pumps numerous pounds of Carbon Dioxide emissions into the Earth’s atmosphere.",
    "Hybrid vehicles are a nice middle ground between electric and gas powered behicles however, they still produce emissions which contribute to the greenhouse gas effect.",
    "The CDC recommends a typical shower last approximately 8 minutes, any less is seen as unhygienic.","The CDC recommends a typical shower last approximately 8 minutes.",
    "The CDC recommends a typical shower last approximately 8 minutes, any more is seen as wasting water and should be reduced.",
    "The UN is focused on Environmental development but also Economic and Social Sustainable development.",
    " The UN is focused on Environmental development but also Economic and Social Sustainable development.",
    "Preventing Deforestation is in fact not one of the 17 named Sustainable Development Goals (SDG’s)."]

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
    this.score = 100;
    this.showCards = 1;
    this.userService.sendStatus([])
    this.testId = 0;
    this.qNumber = 1;
  }

  public async restart(ev: any){
    this.score = 100;
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
        date: dt.toDateString(),
        time: time,
        score: this.score
      }
      this.scoreService.sendStatus(this.leaderboard.concat(newLeaderBoard).sort((n1,n2) => {
        if(n1.score < n2.score) {
          return 1
        } else if (n1.score > n2.score) {
          return -1
        } else {
          return 0
        }
      }))
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
