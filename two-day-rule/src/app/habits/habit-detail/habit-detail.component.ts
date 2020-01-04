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
  progress:number;
  
  //calendar = new Calendar(document.getElementById('calendar'), {plugins: [timeGridMonth]});
  calendarSort(){
    this.calendarEvents.sort( (a,b) => (
      a.start<b.start ? -1 : 1
      )
    );
  }


  oneDayDiff(){
    this.calendarSort();

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

  dayValidator(){
    this.progress=1;
    console.log("dayvalidator");
    this.calendarSort();
    let lastindex = this.calendarEvents.length-1;
    for(let i = 0; i< this.calendarEvents.length-1; i++){
      let date1: Date = new Date(this.calendarEvents[i].start.toString());
      let date2: Date = new Date(this.calendarEvents[i+1].start.toString());
      let dateDifferent = date2.valueOf()-date1.valueOf();
      dateDifferent = dateDifferent/1000/60/60/24; //calculate the differentia of 2 date

      let year = date1.getFullYear();
      let monthTemp = date1.getMonth()+1;
      let month;

      if(monthTemp<10){
        month = '0'+monthTemp;
      }

      let day = date1.getDate();
      
      // console.log(year, month, day);
      if(dateDifferent === 1){
        this.progress+=1;
      }

      if(dateDifferent === 2){
        let datestring = year + "-" + month + "-" + (date1.getDate()+1);
        this.calendarEvents = this.calendarEvents.concat({
          title: 'uj',
          start: datestring,
          backgroundColor: 'red',
          rendering: 'background'
        });
        this.progress += 2;
      }



      if(dateDifferent>2){
        for(let i = 0; i<dateDifferent; i++){
          let datestring = year + "-" + month + "-" + (day = day+1);
          this.calendarEvents = this.calendarEvents.concat({
            title: 'uj',
            start: datestring,
            backgroundColor: 'red',
            rendering: 'background'
          });
        }
      }
     // console.log(this.calendarEvents);
      for(let i=1;i<this.calendarEvents.length; i++){
        if(this.calendarEvents[i-1].start===this.calendarEvents[i].start){
          if(this.calendarEvents[i-1].backgroundColor==='red'){
            this.removeAnEvent(i-1);
          }else {
            this.removeAnEvent(i);
          }
        }
      }
      //i+=dateDifferent;

      this.calendarSort();
      //console.log(dateDifferent);
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
   let habitElem = new Habit(this.habit.name, this.habit.description, this.progress, this.calendarEvents);
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
