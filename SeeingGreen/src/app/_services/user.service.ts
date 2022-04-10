import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService{
    private user = new Subject<any>();
    private logStatus: any[] = [];

    sendStatus(status: any[]) {
        this.logStatus = status;
        this.user.next(this.logStatus );
    }

    onStatus(): Observable<any> {
        return this.user.asObservable();
    }

    getStatus() {
        this.user.next(this.logStatus)
    }

}

@Injectable({ providedIn: 'root' })
export class ScoreService{
    private score = new Subject<any>();
    private scoreStatus: any[] = [];

    sendStatus(status: any[]) {
        this.scoreStatus = status;
        this.score.next(this.scoreStatus );
    }

    onStatus(): Observable<any> {
        return this.score.asObservable();
    }

    getStatus() {
        this.score.next(this.scoreStatus)
    }

}

export interface LeaderBoard{
    date: string;
    time: string;
    score: number;
}