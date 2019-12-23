import { Component, OnInit, Input } from '@angular/core';
import { Habit } from '../../habit.model';
import { HabitService } from '../../habit.service';

@Component({
  selector: 'app-habit-item',
  templateUrl: './habit-item.component.html',
  styleUrls: ['./habit-item.component.css']
})
export class HabitItemComponent implements OnInit {

  @Input() habit: Habit;
  constructor(private habitService: HabitService) { }

  ngOnInit() {
  }

  onSelected() {
    this.habitService.habitSelected.emit(this.habit);
  }

}
