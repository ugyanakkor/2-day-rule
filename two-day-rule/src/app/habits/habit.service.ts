import { Habit } from './habit.model';
//import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class HabitService {
    habitsChanged = new Subject<Habit[]>();

    //habitSelected = new EventEmitter<Habit>();

    private habits: Habit[] = [
        new Habit('Edzés', 'Takarodj kondizni', '7/30'),
        new Habit('Olvasás', 'Takarodj olvasni', '22/30')
      ];
    
      getHabits() {
          return this.habits.slice();
      }

      getHabit(index: number) {
          return this.habits[index];
      }

      addHabit(habit: Habit) {
        this.habits.push(habit);
        this.habitsChanged.next(this.habits.slice());
      }

      updateHabit(index: number, newHabit: Habit) {
        this.habits[index] = newHabit;
        this.habitsChanged.next(this.habits.slice());
      }

      deleteHabit(index: number) {
          this.habits.splice(index, 1);
          this.habitsChanged.next(this.habits.slice());
      }
}