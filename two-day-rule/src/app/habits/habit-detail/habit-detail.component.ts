import { Component, OnInit } from '@angular/core';
import { Habit } from '../habit.model';
import { HabitService } from '../habit.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.component.html',
  styleUrls: ['./habit-detail.component.css']
})
export class HabitDetailComponent implements OnInit {
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
      }
    );
  }

  onEditHabit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
