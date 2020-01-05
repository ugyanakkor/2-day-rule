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
    let habitEvents: EventInput[];
    const newHabit = new Habit(
      this.habitForm.value.name, 
      this.habitForm.value.description, 
      0,
      habitEvents
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
  let habitProgress = 0;
  let habitEvents: EventInput[];
  
  if(this.editMode) {
    const habit = this.habitService.getHabit(this.id);
    habitName = habit.name;
    habitDescription = habit.description;
    habitProgress = habit.progress;
    habitEvents = habit.events;
   // habitCalendar = habit.calendarEventsFromHabit;
  }

  this.habitForm = new FormGroup({
      'name': new FormControl(habitName, Validators.required),
      'description': new FormControl(habitDescription, Validators.required),
      'progress': new FormControl(habitProgress, Validators.required)
    });
  }

}
