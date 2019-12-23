import { Component, OnInit } from '@angular/core';
import { Habit } from './habit.model';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent implements OnInit {
  selectedHabit: Habit;
  constructor() { }

  ngOnInit() {
  }

}
