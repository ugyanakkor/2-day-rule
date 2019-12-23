import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Habit } from '../../habit.model';

@Component({
  selector: 'app-habit-item',
  templateUrl: './habit-item.component.html',
  styleUrls: ['./habit-item.component.css']
})
export class HabitItemComponent implements OnInit {

  @Input() habit: Habit;
  @Output() habitSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.habitSelected.emit();
  }

}
