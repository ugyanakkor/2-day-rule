import { Component, OnInit } from '@angular/core';
import { Habit } from '../habit.model';
import { HabitService } from '../habit.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css']
})
export class HabitListComponent implements OnInit {
  habits: Habit[];

  constructor(private habitService: HabitService,
    private router: Router,
    private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.habits = this.habitService.getHabits();
  }


  onNewHabit() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
