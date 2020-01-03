import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HabitService } from '../habit.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, Calendar } from '@fullcalendar/core';
import timeGridMonth from '@fullcalendar/daygrid';
import { Habit } from '../habit.model';
import { EventsForCalendar } from '../events.model';


@Component({
  selector: 'app-habit-edit',
  templateUrl: './habit-edit.component.html',
  styleUrls: ['./habit-edit.component.css']
})
export class HabitEditComponent implements OnInit {

  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [
    { start: new Date() , backgroundColor:'red' }
  ];
  
  calendarForHabits: EventsForCalendar[];

  calendar = new Calendar(null, {plugins: [timeGridMonth]});
  
  handleDateClick(arg) {
    let newcalendar = new Calendar(document.getElementById('calendar'), {plugins: [timeGridMonth]});
    if(arg.dayEl.style.backgroundColor === '')
    {
      arg.dayEl.style.backgroundColor = 'green';
    } else if (arg.dayEl.style.backgroundColor === 'green') {
      arg.dayEl.style.backgroundColor = 'red';
    } else {
      arg.dayEl.style.backgroundColor = '';
    }

    this.calendarEvents.push({start: arg.dateStr, backgroundColor: arg.dayEl.style.backgroundColor});
    console.log(this.calendarEvents);
    newcalendar.addEventSource(this.calendarEvents);
    console.log(newcalendar.getEvents());
    this.calendar = newcalendar;
   // this.calendar.render();
  }
  



  id: number;
  editMode = false;
  habitForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private habitService: HabitService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id=+params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
     this.calendar.render();
    for(let i = 0; i <= this.calendarEvents.length; i++) {
     this.calendarForHabits[i] = new EventsForCalendar(this.calendarEvents[i].start.toString(), this.calendarEvents[i].backgroundColor);
    }


    const newHabit = new Habit(
      this.habitForm.value.name, 
      this.habitForm.value.description, 
      this.habitForm.value.progress,
      this.calendarForHabits
      );

    if (this.editMode) {
      this.habitService.updateHabit(this.id, newHabit);
    } else {
      this.habitService.addHabit(newHabit);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {

  let habitName = '';
  let habitDescription = '';
  let habitProgress = '';
  let habitCalendar = new EventsForCalendar[''];
  
  if(this.editMode) {
    const habit = this.habitService.getHabit(this.id);
    habitName = habit.name;
    habitDescription = habit.description;
    habitProgress = habit.progress;
   // habitCalendar = habit.calendarEventsFromHabit;
  }

  this.habitForm = new FormGroup({
      'name': new FormControl(habitName, Validators.required),
      'description': new FormControl(habitDescription, Validators.required),
      'progress': new FormControl(habitProgress, Validators.required)
    });
  }

}
