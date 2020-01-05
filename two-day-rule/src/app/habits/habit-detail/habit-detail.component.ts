import { Component, OnInit } from '@angular/core';
import { Habit } from '../habit.model';
import { HabitService } from '../habit.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.component.html',
  styleUrls: ['./habit-detail.component.css']
})
export class HabitDetailComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [];
  progressSum:number;
  failedChallange = false;
  unsuccess = "Unfortunately, you failed to comply the 2 day rule :(";
  success = "Congratulations, you have did it! :)";

  habit: Habit;

  id: number;
  

  constructor(private habitService: HabitService,
              private route: ActivatedRoute,
              private router: Router) { 
}

  ngOnInit() {
  this.route.params
  .subscribe(
    (params: Params) => {
      this.id = +params['id'];  
      this.habit = this.habitService.getHabit(this.id);
      this.progressSum = this.habit.progress;
      this.failedChallange = this.habit.habitFail;

      let uj:EventInput[]=[];
      for(let i =0; i<this.habit.events.length; i++){
          uj = 
          uj.concat({
            start: this.habit.events[i].start, 
            backgroundColor: this.habit.events[i].backgroundColor,
            rendering: 'background'
          });
        }
        this.calendarEvents = uj;
      }
    );
  }

  calendarSort(){
    this.calendarEvents.sort( (a,b) => (
      a.start<b.start ? -1 : 1
      )
    );
  }

  removeAnEvent(index: number){
    let uj : EventInput[] = [];
    for(let i = 0; i<index; i++){
      uj[i]=this.calendarEvents[i];
    }
    for(let i = index+1; i<this.calendarEvents.length; i++){
      uj[i-1]=this.calendarEvents[i];
    }
    this.calendarEvents = uj;
  }

  //if you missed more than one day, u fail
  redCounter(){
    this.calendarSort();
    let lastindex = this.calendarEvents.length-1;
    let date1: Date = new Date(this.calendarEvents[0].start.toString());
    let dateLast: Date = new Date(this.calendarEvents[lastindex].start.toString());
    let dateDifferent = (Number(dateLast.valueOf()) - Number(date1.valueOf()));
    dateDifferent = (dateDifferent/1000/60/60/24);
    dateDifferent = Number( dateDifferent.toPrecision(2));
    this.progressSum = dateDifferent;

    this.failedChallange = false;
    let redCounter = 0;
    for(let i = 0; i<this.calendarEvents.length; i++){
      if(this.calendarEvents[i].backgroundColor==='red'){
        redCounter++;
      }else if(this.calendarEvents[i].backgroundColor === 'green' && redCounter<=1){
        redCounter = 0;
      }
      if(redCounter == 2){
        this.failedChallange = true;
      }
    }
    

    if(this.failedChallange){
      this.progressSum = 0;
    }
    else{
      this.progressSum = dateDifferent + 1;
    }
  }

  onHandleSuccess(){
    this.progressSum = null;
  }

  //this day is green or red or white
  dayValidator(){
    this.calendarSort();
    for(let i = 0; i< this.calendarEvents.length-1; i++){
      let date1: Date = new Date(this.calendarEvents[i].start.toString());
      let date2: Date = new Date(this.calendarEvents[i+1].start.toString());

      this.calendarSort();

      let dateDifferent = date2.valueOf()-date1.valueOf();
      dateDifferent = dateDifferent/1000/60/60/24; //calculate the different of 2 date

      let year = date1.getFullYear();
      let monthTemp = date1.getMonth()+1;
      let month;

      //date correction
      if(monthTemp<10){
        month = '0'+monthTemp;
      }

      let day = date1.getDate().toString();
      if(day.length === 1){
        day = '0'+day;
      }

      let dayForDiff2 = (date1.getDate()+1).toString();
      if(dayForDiff2.length === 1){
        dayForDiff2 = '0'+dayForDiff2;
      }

      //you missed 1 day
      if(dateDifferent === 2){
        let datestring = year + "-" + month + "-" + (dayForDiff2);
        this.calendarEvents = this.calendarEvents.concat({
          start: datestring,
          backgroundColor: 'red',
          rendering: 'background'
        });
      }

      // you missed more than 1 day
      if(dateDifferent>2){
        let dayForDiff3 = date1.getDate();
        let temp ='';
        for(let i = 0; i<dateDifferent-1; i++){
          dayForDiff3++;
          //date correction
          if(dayForDiff3>31 && (monthTemp===1||3||5||7||8||10||12)){
            dayForDiff3-=31;

            monthTemp+=1;
            if(monthTemp<10){
              month = '0'+monthTemp;
            }
          }else if(dayForDiff3>30 && (monthTemp===4||6||9||11)){
            dayForDiff3-=30;
            monthTemp+=1;
            if(monthTemp<10){
              month = '0'+monthTemp;
            }
          }else if(dayForDiff3>29 && (monthTemp===2)){
            dayForDiff3-=29;
            monthTemp+=1;
            if(monthTemp<10){
              month = '0'+monthTemp;
            }
          }

          if(dayForDiff3.toString().length === 1){
            temp = '0' + dayForDiff3;
          }else{
            temp = dayForDiff3.toString();
          }
          let datestring = year + "-" + month + "-" + temp;
          this.calendarEvents = this.calendarEvents.concat({
            start: datestring,
            backgroundColor: 'red',
            rendering: 'background'
          });
        }
      }
    }
  }

  
  temp: boolean = false; //if u clicked this unit before, its become true
  //Click event handle
  handleDateClick(arg) {
    let index = -1;
    let i;
    for(i = 0; i<this.calendarEvents.length; i++){
      if(arg.dateStr === this.calendarEvents[i].start) {
        this.temp = true;
        index = i;
      }
    }
    if(index === -1){
      this.temp = false;
    } 
    
    if(this.temp === false){
        this.calendarEvents = this.calendarEvents.concat( // creates a new array!
          { 
            start: arg.dateStr, 
            backgroundColor: 'green',
            rendering: "background"
          }
        );
        this.calendarSort();
    }else{
      if(this.calendarEvents[index].backgroundColor === 'green' || 'red'){
        this.removeAnEvent(index);
      }
    }

    this.dayValidator();
    this.redCounter();

   let habitElem = new Habit(this.habit.name, this.habit.description, this.progressSum, this.calendarEvents, this.failedChallange);
   this.habitService.updateHabit(this.id, habitElem);
   const data = this.habitService.getHabits();
   localStorage.setItem('habits', JSON.stringify(data));
   this.habitService.setHabits();
  }

  onEditHabit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteHabit() {
    this.habitService.deleteHabit(this.id);
    this.router.navigate(['/habits'], {relativeTo: this.route});
  }
}
