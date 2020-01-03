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
  
  //calendar = new Calendar(document.getElementById('calendar'), {plugins: [timeGridMonth]});
  
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
      this.calendarEvents = this.calendarEvents.concat( // creates a new array!
        { 
          title: 'this 2', 
          start: arg.dateStr, 
          backgroundColor: 'green',
          rendering: "background"
        }
      );
    }else{
      
      if(this.calendarEvents[index].backgroundColor === 'green'){
        let uj : EventInput[] = [];

        for(let i = 0; i<index; i++){
          uj[i]=this.calendarEvents[i];
        }
        for(let i = index+1; i<this.calendarEvents.length; i++){
          uj[i-1]=this.calendarEvents[i];
        }

        console.log(uj);
        this.calendarEvents = uj;
        //console.log(this.calendarEvents.length);
/*
        if(index<this.calendarEvents.length){
          for(let i = index+1; i <= this.calendarEvents.length; i++){
            uj[i]=this.calendarEvents[i];
          }
        }*/
        //this.calendarEvents=this.calendarEvents.concat(uj);
        //this.calendarEvents=uj;
/*
        uj[index].title = 'lol';
        uj[index].start = arg.dateStr;
        uj[index].backgroundColor = '';
        uj[index].rendering = 'background';
        this.calendarEvents = uj;*/
       /* this.calendarEvents = this.calendarEvents.concat({
          title: 'rőf', start: arg.dateStr, backgroundColor: 'red', rendering: 'background'
        });*/
        /*this.calendarEvents = [];
        this.calendarEvents = this.calendarEvents.concat(uj);*/
        
      /*  this.calendarEvents.concat({ 
          title: 'this 2', 
          start: '1996-01-01', 
          backgroundColor: 'red',
          rendering: "background"
        });
        this.calendarEvents.pop();*/
        /*this.calendarEvents = this.calendarEvents.concat( // creates a new array!
          { 
            title: 'this 2', 
            start: arg.dateStr, 
            backgroundColor: 'red',
            rendering: "background"
          }
        );*/
       /* arg.dayEl.style.backgroundColor = "";
        arg.dayEl.style.backgroundColor = "red";*/
      }
    }
   

    
  


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
   console.log(arg);
   console.log(arg.dateStr);
   console.log(this.calendarEvents);
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
      for(let i =0; i<this.habit.calendarEventsFromHabit.length; i++){
          this.calendarEvents = 
          this.calendarEvents.concat({
            title: 'test',
            start: this.habit.calendarEventsFromHabit[i].start, 
            backgroundColor: this.habit.calendarEventsFromHabit[i].backgroundColor,
            rendering: 'background'
          });
        }
        //console.log(this.habit.calendarEvents);
        console.log( this.calendarEvents);

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
