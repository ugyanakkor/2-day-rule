import { Component, OnInit } from '@angular/core';
import { Habit } from '../habit.model';
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css']
})
export class HabitListComponent implements OnInit {
  habits: Habit[];

  constructor(private habitService: HabitService) { 
  }

  ngOnInit() {
    this.habits = this.habitService.getHabits();
  }

}
