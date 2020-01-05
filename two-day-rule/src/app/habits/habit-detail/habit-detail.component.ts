import { Component, OnInit, ViewChild } from '@angular/core';
import { Habit } from '../habit.model';
import { HabitService } from '../habit.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { Calendar, EventInput } from '@fullcalendar/core';
import timeGridMonth from '@fullcalendar/daygrid';
import { Binary } from '@angular/compiler';

@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.component.html',
  styleUrls: ['./habit-detail.component.css']
})
export class HabitDetailComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [
  //  { title: 'this', start: '2020-01-13' }
  ];
  progressSum:number;
  failedChallange = false;
  unsuccess = "Sajnos nem sikerült a 30 napig betartanod a 2 day rule-t :(";
  success = "Gratulálunk, sikerült a 30 napig betartanod a 2 day rule-t! :)";
  //calendar = new Calendar(document.getElementById('calendar'), {plugins: [timeGridMonth]});
  calendarSort(){
    this.calendarEvents.sort( (a,b) => (
      a.start<b.start ? -1 : 1
      )
    );
  }
 // datum = new Date(Mon Feb 03 2020);
  dateSort()
  {

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

  redCounter(){
    this.calendarSort();
    let lastindex = this.calendarEvents.length-1;
    let date1: Date = new Date(this.calendarEvents[0].start.toString());
    let dateLast: Date = new Date(this.calendarEvents[lastindex].start.toString());
    console.log(dateLast);
    let dateDifferent = (Number(dateLast.valueOf()) - Number(date1.valueOf()));
    console.log(dateDifferent);
    dateDifferent = (dateDifferent/1000/60/60/24);
    dateDifferent = Number( dateDifferent.toPrecision(2));
    this.progressSum = dateDifferent;
    console.log("dateDiff:");
    console.log(dateDifferent);

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

  /*onHandleFail(){
    this.failedChallange=null;
  }*/
  onHandleSuccess(){
    this.progressSum = null;
  }
  dayValidator(){
    console.log("dayvalidator");
    this.calendarSort();
    let lastindex = this.calendarEvents.length-1;
    for(let i = 0; i< this.calendarEvents.length-1; i++){
      let date1: Date = new Date(this.calendarEvents[i].start.toString());
      let date2: Date = new Date(this.calendarEvents[i+1].start.toString());

      this.calendarSort();

      let dateDifferent = date2.valueOf()-date1.valueOf();
      dateDifferent = dateDifferent/1000/60/60/24; //calculate the differentia of 2 date

      let year = date1.getFullYear();
      let monthTemp = date1.getMonth()+1;
      let month;

      if(monthTemp<10){
        month = '0'+monthTemp;
      }

      let day = date1.getDate().toString();

      if(day.length === 1){
        day = '0'+day;
      }

      
      // console.log(year, month, day);
      let dayForDiff2 = (date1.getDate()+1).toString();
      if(dayForDiff2.length === 1){
        dayForDiff2 = '0'+dayForDiff2;
      }

      if(dateDifferent === 2){
        let datestring = year + "-" + month + "-" + (dayForDiff2);
        this.calendarEvents = this.calendarEvents.concat({
          title: 'uj',
          start: datestring,
          backgroundColor: 'red',
          rendering: 'background'
        });
      }

   

      if(dateDifferent>2){
        let dayForDiff3 = date1.getDate();

        console.log('day3:');
        console.log(dayForDiff3);
        let temp ='';
        for(let i = 0; i<dateDifferent-1; i++){
          dayForDiff3++;
          if(dayForDiff3.toString().length === 1){
            temp = '0' + dayForDiff3;
          }else{
            temp = dayForDiff3.toString();
          }
          let datestring = year + "-" + month + "-" + temp;
          this.calendarEvents = this.calendarEvents.concat({
            title: 'uj',
            start: datestring,
            backgroundColor: 'red',
            rendering: 'background'
          });
        }
      }

    }

   


  }

  
  temp: boolean = false;
  handleDateClick(arg) {
    console.log(arg.dayEl.style.backgroundColor);
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
    console.log(this.temp);
    
    if(this.temp === false){
      /*let dayDiffMin=30;
      for(let i = 0; i< this.calendarEvents.length-1; i++){
        let date1: Date = new Date(this.calendarEvents[i].start.toString());
        let date2: Date = new Date(arg.dateStr);
        let dayDiff = date2.valueOf()-date1.valueOf();
        dayDiff = dayDiff/1000/60/60/24;
        if(dayDiff < dayDiffMin && dayDiff>0){
          dayDiffMin = dayDiff;
        }
      }*/
      //if(dayDiffMin<=2){
        this.calendarEvents = this.calendarEvents.concat( // creates a new array!
          { 
            title: 'this 2', 
            start: arg.dateStr, 
            backgroundColor: 'green',
            rendering: "background"
          }
        );

        //this.calendarSort();

      //}
    }else{
      if(this.calendarEvents[index].backgroundColor === 'green' || 'red'){
        this.removeAnEvent(index);
        /*let uj : EventInput[] = [];

        for(let i = 0; i<index; i++){
          uj[i]=this.calendarEvents[i];
        }
        for(let i = index+1; i<this.calendarEvents.length; i++){
          uj[i-1]=this.calendarEvents[i];
        }

        console.log(uj);
        this.calendarEvents = uj;*/
      }
      //console.log(index);
      //console.log(this.calendarEvents[index].backgroundColor);
      /*if(this.calendarEvents[index].backgroundColor === 'red'){
        this.removeAnEvent(index);
      }*/
    }

    this.dayValidator();
    this.redCounter();
  


  /*  if(arg.dayEl.style.backgroundColor === '')
    {
      arg.dayEl.style.backgroundColor = 'green';
    } else if (arg.dayEl.style.backgroundColor === '#B3D9B3') {
      arg.dayEl.style.backgroundColor = '#FFB3B3';
    } else {
      arg.dayEl.style.backgroundColor = '';
    }

    this.calendarEvents = this.calendarEvents.concat( // creates a new array!
      { 
        title: 'this 2', 
        start: arg.dateStr, 
        backgroundColor: ''
      }
    );*/

  /*  this.calendar.addEvent( {
      title: 'Allday', 
      start: arg.dateStr, 
      backgroundColor: arg.dayEl.style.backgroundColor,
      rendering: 'background'
    });*/
   /* { plugins: [timeGridMonth], 
      events: [ {title: 'Allday', start: arg.dateStr, backgroundColor: arg.dayEl.style.backgroundColor, rendering: 'background'}]
    };*/

   //this.calendar.render();
   let habitElem = new Habit(this.habit.name, this.habit.description, this.progressSum, this.calendarEvents);
   this.habitService.updateHabit(this.id, habitElem);
   /*console.log(arg);
   console.log(arg.dateStr);
   console.log(this.calendarEvents);*/
   console.log(this.habit);
  }



  

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
       // this.calendarEvents = this.calendarEvents.concat({title: 'event 2', start: '2020-01-01'});
      
        /*this.calendar.addEvent( {
          title: 'Allday', 
          start: '2020-01-06',
          backgroundColor: 'red', 
          rendering: 'background'
        });*/

      let uj:EventInput[]=[];
      for(let i =0; i<this.habit.events.length; i++){
          uj = 
          uj.concat({
            title: 'test',
            start: this.habit.events[i].start, 
            backgroundColor: this.habit.events[i].backgroundColor,
            rendering: 'background'
          });
        }
        this.calendarEvents = uj;
        //console.log(this.habit.calendarEvents);
       /* console.log('eztnézd');
        console.log( this.calendarEvents);
        console.log('eztnézd');*/
        //this.calendar.render();
        // console.log(this.habit.calendar.getEvents());
      }
    );
  }

  onEditHabit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteHabit() {
    this.habitService.deleteHabit(this.id);
    this.router.navigate(['/habits'], {relativeTo: this.route});
  }
}
