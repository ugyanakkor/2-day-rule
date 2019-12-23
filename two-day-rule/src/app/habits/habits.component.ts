import { Component, OnInit } from '@angular/core';
import { Habit } from './habit.model';
import { HabitService } from './habit.service';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css'],
  providers: [HabitService]
})
export class HabitsComponent implements OnInit {
  selectedHabit: Habit;
  constructor(private habitService: HabitService) { }

  ngOnInit() {
    this.habitService.habitSelected
    .subscribe(
      (habit: Habit) => {
        this.selectedHabit = habit;
      }
    )
  }

}
