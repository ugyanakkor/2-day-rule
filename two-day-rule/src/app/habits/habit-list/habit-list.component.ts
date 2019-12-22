import { Component, OnInit } from '@angular/core';
import { Habit } from '../habit.model';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css']
})
export class HabitListComponent implements OnInit {
  habits: Habit[] = [
    new Habit('Edzés', 'Takarodj kondizni', '7/30'),
    new Habit('Olvasás', 'Takarodj olvasni', '22/30')
  ];

  constructor() { }

  ngOnInit() {
  }

}
