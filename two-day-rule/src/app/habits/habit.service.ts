import { Habit } from './habit.model';
import { EventEmitter } from '@angular/core';

export class HabitService {
    habitSelected = new EventEmitter<Habit>();
    
    private habits: Habit[] = [
        new Habit('Edzés', 'Takarodj kondizni', '7/30'),
        new Habit('Olvasás', 'Takarodj olvasni', '22/30')
      ];
    
      getHabits() {
          return this.habits.slice();
      }
}