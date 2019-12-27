import { Component, OnInit, OnDestroy } from '@angular/core';
import { Habit } from '../habit.model';
import { HabitService } from '../habit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css']
})
export class HabitListComponent implements OnInit, OnDestroy {
  habits: Habit[];
  subscription: Subscription;

  constructor(private habitService: HabitService,
    private router: Router,
    private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.subscription = this.habitService.habitsChanged
    .subscribe(
      (habits: Habit[]) => {
        this.habits = habits
      }
    )
    this.habits = this.habitService.getHabits();
  }


  onNewHabit() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
