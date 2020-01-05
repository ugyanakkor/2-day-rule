import { Component, OnInit } from '@angular/core';
import { Habit } from './habit.model';
import { HabitService } from './habit.service';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css'],
})
export class HabitsComponent {
  selectedHabit: Habit;

}
