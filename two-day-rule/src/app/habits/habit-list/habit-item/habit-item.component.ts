import { Component, OnInit, Input, Output,EventEmitter, HostListener } from '@angular/core';
import { Habit } from '../../habit.model';
import { HabitDetailComponent } from '../../habit-detail/habit-detail.component';

@Component({
  selector: 'app-habit-item',
  templateUrl: './habit-item.component.html',
  styleUrls: ['./habit-item.component.css']
})
export class HabitItemComponent implements OnInit {

  @Input() habit: Habit;
  @Input() index: number;

  ngOnInit() {
  }
  
}
