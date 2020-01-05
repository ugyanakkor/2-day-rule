import { Component, OnInit } from '@angular/core';
import { HabitService } from './habits/habit.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private habitService: HabitService) {}

  ngOnInit(){
    this.habitService.setHabits();
  }
}
